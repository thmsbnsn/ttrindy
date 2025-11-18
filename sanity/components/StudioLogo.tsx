import React from 'react'

export function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 0' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '6px',
          padding: '6px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          flexShrink: 0,
        }}
      >
        {/* Using a simple TTR text logo since image import is complex in Sanity Studio */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '700',
            color: '#1a1a1a',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.5px',
          }}
        >
          TTR
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
        <span
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          TOP TIER
        </span>
        <span
          style={{
            fontSize: '12px',
            color: '#666',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Restoration
        </span>
      </div>
    </div>
  )
}

