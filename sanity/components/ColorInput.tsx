import React from 'react'
import { set, unset, PatchEvent } from 'sanity'
import { StringInputProps } from 'sanity'

export const ColorInput = React.forwardRef<HTMLInputElement, StringInputProps>((props, ref) => {
  const { value, onChange, schemaType } = props

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(PatchEvent.from(newValue ? set(newValue) : unset()))
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    // Validate hex color format
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newValue) || newValue === '') {
      onChange(PatchEvent.from(newValue ? set(newValue) : unset()))
    }
  }

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '8px 0' }}>
      <div style={{ position: 'relative' }}>
        <input
          ref={ref}
          type="color"
          value={value || '#000000'}
          onChange={handleColorChange}
          style={{
            width: '50px',
            height: '50px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            cursor: 'pointer',
            padding: '2px',
            backgroundColor: '#fff',
          }}
          title="Click to pick a color"
        />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <input
          type="text"
          value={value || ''}
          onChange={handleTextChange}
          placeholder="#000000"
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'monospace',
          }}
        />
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          Or type a hex code (e.g., #00AEEF)
        </div>
      </div>
      {value && (
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: value,
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
          title={`Current color: ${value}`}
        />
      )}
    </div>
  )
})

ColorInput.displayName = 'ColorInput'

