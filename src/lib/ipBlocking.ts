// src/lib/ipBlocking.ts
/**
 * Client-side IP blocking utility
 * Tracks failed password attempts and blocks access for 30 minutes after 5 failed attempts
 *
 * Note: This is client-side only and can be bypassed by clearing localStorage.
 * For production, this should be implemented server-side.
 */

const STORAGE_KEY_ATTEMPTS = 'ttr_auth_attempts'
const STORAGE_KEY_BLOCKED = 'ttr_auth_blocked'
const MAX_ATTEMPTS = 5
const BLOCK_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds

interface AttemptRecord {
  ip: string
  timestamp: number
  count: number
}

interface BlockedRecord {
  ip: string
  blockedUntil: number
}

/**
 * Get user's IP address using a free service
 * Falls back to a browser fingerprint if IP service fails
 */
export async function getUserIP(): Promise<string> {
  try {
    // Try to get IP from a free service
    const response = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      cache: 'no-cache',
    })

    if (response.ok) {
      const data = await response.json()
      return data.ip || getBrowserFingerprint()
    }
  } catch (error) {
    console.warn('Failed to fetch IP address:', error)
  }

  // Fallback to browser fingerprint
  return getBrowserFingerprint()
}

/**
 * Generate a browser fingerprint as fallback
 * Combines user agent, screen resolution, and timezone
 */
function getBrowserFingerprint(): string {
  const ua = navigator.userAgent
  const screen = `${screen.width}x${screen.height}`
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const lang = navigator.language

  // Simple hash function
  const str = `${ua}-${screen}-${tz}-${lang}`
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return `fp_${Math.abs(hash).toString(36)}`
}

/**
 * Check if the current IP is blocked
 */
export function isIPBlocked(ip: string): boolean {
  try {
    const blockedData = localStorage.getItem(STORAGE_KEY_BLOCKED)
    if (!blockedData) return false

    const blocked: BlockedRecord[] = JSON.parse(blockedData)
    const now = Date.now()

    // Filter out expired blocks
    const activeBlocks = blocked.filter(block => block.blockedUntil > now)

    // Update storage with only active blocks
    if (activeBlocks.length !== blocked.length) {
      localStorage.setItem(STORAGE_KEY_BLOCKED, JSON.stringify(activeBlocks))
    }

    // Check if current IP is blocked
    const isBlocked = activeBlocks.some(block => block.ip === ip)
    return isBlocked
  } catch (error) {
    console.error('Error checking IP block status:', error)
    return false
  }
}

/**
 * Get remaining block time in minutes for a specific IP
 * If no IP provided, gets the current user's IP
 */
export async function getRemainingBlockTime(ip?: string): Promise<number> {
  try {
    const targetIP = ip || await getUserIP()
    const blockedData = localStorage.getItem(STORAGE_KEY_BLOCKED)
    if (!blockedData) return 0

    const blocked: BlockedRecord[] = JSON.parse(blockedData)
    const block = blocked.find(b => b.ip === targetIP)

    if (!block) return 0

    const now = Date.now()
    const remaining = block.blockedUntil - now

    if (remaining <= 0) return 0

    return Math.ceil(remaining / (60 * 1000)) // Convert to minutes
  } catch (error) {
    console.error('Error getting remaining block time:', error)
    return 0
  }
}

/**
 * Record a failed password attempt
 * Returns true if IP should be blocked (5 failed attempts)
 */
export async function recordFailedAttempt(): Promise<boolean> {
  try {
    const ip = await getUserIP()

    // Check if already blocked
    if (isIPBlocked(ip)) {
      return true
    }

    // Get existing attempts
    const attemptsData = localStorage.getItem(STORAGE_KEY_ATTEMPTS)
    let attempts: AttemptRecord[] = attemptsData ? JSON.parse(attemptsData) : []

    // Find or create attempt record for this IP
    let attempt = attempts.find(a => a.ip === ip)

    if (!attempt) {
      attempt = { ip, timestamp: Date.now(), count: 0 }
      attempts.push(attempt)
    }

    // Increment attempt count
    attempt.count++
    attempt.timestamp = Date.now()

    // Clean up old attempts (older than block duration)
    const now = Date.now()
    attempts = attempts.filter(a => (now - a.timestamp) < BLOCK_DURATION)

    // Save attempts
    localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(attempts))

    // Check if we've reached max attempts
    if (attempt.count >= MAX_ATTEMPTS) {
      blockIP(ip)
      return true
    }

    return false
  } catch (error) {
    console.error('Error recording failed attempt:', error)
    return false
  }
}

/**
 * Block an IP address for 30 minutes
 */
function blockIP(ip: string): void {
  try {
    const blockedData = localStorage.getItem(STORAGE_KEY_BLOCKED)
    const blocked: BlockedRecord[] = blockedData ? JSON.parse(blockedData) : []

    const now = Date.now()
    const blockedUntil = now + BLOCK_DURATION

    // Remove existing block for this IP if any
    const filtered = blocked.filter(b => b.ip !== ip)

    // Add new block
    filtered.push({ ip, blockedUntil })

    localStorage.setItem(STORAGE_KEY_BLOCKED, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error blocking IP:', error)
  }
}

/**
 * Clear failed attempts for an IP (on successful login)
 */
export async function clearFailedAttempts(): Promise<void> {
  try {
    const ip = await getUserIP()
    const attemptsData = localStorage.getItem(STORAGE_KEY_ATTEMPTS)

    if (!attemptsData) return

    const attempts: AttemptRecord[] = JSON.parse(attemptsData)
    const filtered = attempts.filter(a => a.ip !== ip)

    localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error clearing failed attempts:', error)
  }
}

/**
 * Get remaining attempts before block
 */
export async function getRemainingAttempts(): Promise<number> {
  try {
    const ip = await getUserIP()
    const attemptsData = localStorage.getItem(STORAGE_KEY_ATTEMPTS)

    if (!attemptsData) return MAX_ATTEMPTS

    const attempts: AttemptRecord[] = JSON.parse(attemptsData)
    const attempt = attempts.find(a => a.ip === ip)

    if (!attempt) return MAX_ATTEMPTS

    return Math.max(0, MAX_ATTEMPTS - attempt.count)
  } catch (error) {
    console.error('Error getting remaining attempts:', error)
    return MAX_ATTEMPTS
  }
}

