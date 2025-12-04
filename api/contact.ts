import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting (simple in-memory, use Redis in production for distributed systems)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // requests per hour per IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  // Clean up old entries periodically (every 100 requests)
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// Input sanitization to prevent XSS
function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*'
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, X-Requested-With'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] as string ||
    req.socket.remoteAddress ||
    'unknown'

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.'
    })
  }

  try {
    const { name, email, phone, message } = req.body

    // Validation - all fields required
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Type validation
    if (typeof name !== 'string' || typeof email !== 'string' ||
        typeof phone !== 'string' || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid field types' })
    }

    // Length validation
    if (name.length > 100) {
      return res.status(400).json({ error: 'Name must be less than 100 characters' })
    }
    if (email.length > 255) {
      return res.status(400).json({ error: 'Email must be less than 255 characters' })
    }
    if (phone.length > 20) {
      return res.status(400).json({ error: 'Phone number must be less than 20 characters' })
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message must be less than 1000 characters' })
    }
    if (message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' })
    }

    // Email validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Phone validation (basic - allows digits, spaces, dashes, parentheses)
    const phoneRegex = /^[\d\s\-\(\)]+$/
    const digitsOnly = phone.replace(/\D/g, '')
    if (!phoneRegex.test(phone) || digitsOnly.length < 10) {
      return res.status(400).json({ error: 'Invalid phone number format' })
    }

    // Sanitize inputs (for email HTML content)
    const sanitizedName = sanitizeInput(name)
    const sanitizedMessage = sanitizeInput(message)

    // Check for Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return res.status(500).json({ error: 'Email service not configured' })
    }

    // Get recipient email from environment variable with fallback
    const recipientEmail = process.env.CONTACT_EMAIL || 'thmsbnsn@bnsnsolutions.com'

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Top Tier Restoration <noreply@ttrindy.com>',
      to: recipientEmail,
      reply_to: email, // Allow replies directly to sender
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Submitted from IP: ${ip}<br>
          Time: ${new Date().toISOString()}
        </p>
      `,
      text: `
        New Contact Form Submission

        Name: ${sanitizedName}
        Email: ${email}
        Phone: ${phone}

        Message:
        ${message}

        ---
        IP: ${ip}
        Time: ${new Date().toISOString()}
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
