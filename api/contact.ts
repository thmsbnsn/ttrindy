import type { VercelRequest, VercelResponse } from '@vercel/node'

// Web3Forms public access key
// IMPORTANT: Configure recipient email (Ben@ttrindy.com) in Web3Forms dashboard at https://web3forms.com
const WEB3FORMS_ACCESS_KEY = '6c99a4e6-0831-4e8c-984c-ba1d8a146c7e'

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 3
const RATE_LIMIT_WINDOW = 60 * 60 * 1000

// Spam keyword detection
const SPAM_KEYWORDS = [
  'viagra', 'cialis', 'casino', 'poker', 'lottery', 'winner', 'congratulations',
  'click here', 'buy now', 'limited time', 'act now', 'urgent', 'free money',
  'make money', 'work from home', 'get rich', 'guaranteed', 'no risk',
  'investment opportunity', 'bitcoin', 'crypto', 'forex', 'trading',
  'weight loss', 'diet pill', 'lose weight', 'miracle', 'cure all',
  'pharmacy', 'prescription', 'medication', 'drug', 'pills',
  'seo service', 'backlink', 'website traffic', 'increase ranking',
  'loan', 'credit', 'debt', 'refinance', 'mortgage',
  'dating', 'singles', 'meet people', 'find love',
  'nigerian prince', 'inheritance', 'lottery winner', 'unclaimed funds'
]

const SPAM_PATTERNS = [
  /http[s]?:\/\/[^\s]+/gi,
  /[A-Z]{10,}/g,
  /[!]{3,}/g,
  /(.)\1{4,}/g,
]

function containsSpam(text: string): boolean {
  const lowerText = text.toLowerCase()
  
  for (const keyword of SPAM_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      return true
    }
  }
  
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      return true
    }
  }
  
  const urlCount = (text.match(/http[s]?:\/\//gi) || []).length
  if (urlCount > 2) {
    return true
  }
  
  const suspiciousEmailPatterns = [
    /[0-9]{10,}@/,
    /test\d*@/,
    /temp\d*@/,
  ]
  
  for (const pattern of suspiciousEmailPatterns) {
    if (pattern.test(lowerText)) {
      return true
    }
  }
  
  return false
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*'
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get IP for rate limiting
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
    const { name, email, phone, message, honeypot, timestamp, 'h-captcha-response': hCaptchaResponse } = req.body

    // Honeypot check
    if (honeypot && honeypot.trim() !== '') {
      console.warn('Spam detected: Honeypot field filled', { ip })
      return res.status(400).json({ error: 'Invalid submission' })
    }

    // Timestamp validation
    if (timestamp) {
      const submitTime = Date.now()
      const formTime = parseInt(timestamp, 10)
      const timeDiff = submitTime - formTime
      
      if (timeDiff < 1000) {
        console.warn('Spam detected: Form submitted too quickly', { ip, timeDiff })
        return res.status(400).json({ error: 'Please take your time filling out the form' })
      }
      
      if (timeDiff > 3600000) {
        console.warn('Spam detected: Form open too long', { ip, timeDiff })
        return res.status(400).json({ error: 'Form session expired. Please refresh and try again.' })
      }
    }

    // Field validation
    if (!name || !email || !phone || !message) {
      console.warn('Validation failed: Missing fields')
      return res.status(400).json({ error: 'All fields are required' })
    }

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

    // Phone validation
    const phoneRegex = /^[\d\s\-\(\)]+$/
    const digitsOnly = phone.replace(/\D/g, '')
    if (!phoneRegex.test(phone) || digitsOnly.length < 10) {
      return res.status(400).json({ error: 'Invalid phone number format' })
    }

    // Spam detection
    const fullText = `${name} ${email} ${phone} ${message}`
    if (containsSpam(fullText)) {
      console.warn('Spam detected: Spam keywords found', { ip, email })
      return res.status(400).json({ error: 'Your message contains content that appears to be spam. Please revise and try again.' })
    }

    // Disposable email check
    const disposableEmailDomains = [
      'tempmail', 'guerrillamail', 'mailinator', '10minutemail', 'throwaway',
      'temp-mail', 'fakeinbox', 'mohmal', 'trashmail', 'getnada'
    ]
    const emailDomain = email.split('@')[1]?.toLowerCase() || ''
    if (disposableEmailDomains.some(domain => emailDomain.includes(domain))) {
      console.warn('Spam detected: Disposable email domain', { ip, email })
      return res.status(400).json({ error: 'Please use a valid email address' })
    }

    // Suspicious name check
    if (/[0-9]{3,}/.test(name) || /[^a-zA-Z\s\-'\.]/.test(name)) {
      console.warn('Spam detected: Suspicious name pattern', { ip, name })
      return res.status(400).json({ error: 'Please enter a valid name' })
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedMessage = sanitizeInput(message)

    // Build form data for Web3Forms
    // Use FormData or URL-encoded format instead of JSON to bypass Cloudflare
    const formData = new URLSearchParams({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: sanitizedName,
      email: email,
      phone: phone,
      message: sanitizedMessage,
      subject: `Contact Form: ${sanitizedName}`,
      from_name: 'Top Tier Restoration Contact Form',
    })

    // Add hCaptcha if provided
    if (hCaptchaResponse) {
      formData.append('h-captcha-response', hCaptchaResponse)
    }

    // Send to Web3Forms using application/x-www-form-urlencoded
    const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': 'TopTierRestoration/1.0',
      },
      body: formData.toString(),
    })

    const responseText = await web3formsResponse.text()
    
    let web3formsData
    try {
      web3formsData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Web3Forms response error:', {
        status: web3formsResponse.status,
        statusText: web3formsResponse.statusText,
        responsePreview: responseText.substring(0, 200),
      })
      return res.status(500).json({ 
        error: 'Failed to send email. Please try again later.'
      })
    }

    if (!web3formsResponse.ok || !web3formsData.success) {
      console.error('Web3Forms submission failed:', {
        status: web3formsResponse.status,
        data: web3formsData
      })
      return res.status(500).json({ 
        error: web3formsData.message || 'Failed to send email'
      })
    }

    console.log('Form submitted successfully:', {
      name: sanitizedName,
      email: email,
      ip: ip
    })

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}