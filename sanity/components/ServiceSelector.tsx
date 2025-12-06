import React, { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { PatchEvent, set } from 'sanity'
import { ArrayInputProps, ArrayOfObjectsInputProps } from 'sanity'

interface ServiceDetail {
  icon: string
  title: string
  description: string
  faqId?: string
}

export const ServiceSelector = (props: ArrayOfObjectsInputProps) => {
  const client = useClient({ apiVersion: '2024-12-01' })
  const [servicesFromPage, setServicesFromPage] = useState<ServiceDetail[]>([])
  const [loading, setLoading] = useState(true)
  const { value = [], onChange, schemaType } = props

  useEffect(() => {
    // Fetch services from servicesPage
    client
      .fetch('*[_type == "servicesPage"][0].services')
      .then((services: ServiceDetail[]) => {
        if (services && Array.isArray(services)) {
          setServicesFromPage(services)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching services:', error)
        setLoading(false)
      })
  }, [client])

  const handleSelectService = (service: ServiceDetail) => {
    // Convert serviceDetail to serviceCard format
    const serviceCard = {
      _type: 'serviceCard',
      _key: `service-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      icon: service.icon,
      title: service.title,
      description: service.description,
      faqAnchor: service.faqId || undefined,
    }

    // Add to the array using Sanity's array methods
    const newValue = Array.isArray(value) ? [...value, serviceCard] : [serviceCard]
    onChange(PatchEvent.from(set(newValue)))
  }

  const isServiceSelected = (serviceTitle: string) => {
    return value.some((card: any) => card.title === serviceTitle)
  }

  if (loading) {
    return <div style={{ padding: '16px' }}>Loading services...</div>
  }

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
          Select from Services Page
        </h3>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
          Choose services that are already defined on the Services Page, or create custom service cards below.
        </p>

        {servicesFromPage.length === 0 ? (
          <div style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#666'
          }}>
            No services found on Services Page. Add services there first.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '8px',
            marginBottom: '16px'
          }}>
            {servicesFromPage.map((service, index) => {
              const isSelected = isServiceSelected(service.title)
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !isSelected && handleSelectService(service)}
                  disabled={isSelected}
                  style={{
                    padding: '12px',
                    border: `2px solid ${isSelected ? '#94a3b8' : '#e2e8f0'}`,
                    borderRadius: '6px',
                    backgroundColor: isSelected ? '#f1f5f9' : '#fff',
                    cursor: isSelected ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    opacity: isSelected ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#3b82f6'
                      e.currentTarget.style.backgroundColor = '#eff6ff'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#e2e8f0'
                      e.currentTarget.style.backgroundColor = '#fff'
                    }
                  }}
                >
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '4px',
                    color: isSelected ? '#64748b' : '#1e293b'
                  }}>
                    {service.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {service.description}
                  </div>
                  {isSelected && (
                    <div style={{
                      fontSize: '11px',
                      color: '#64748b',
                      marginTop: '4px',
                      fontStyle: 'italic'
                    }}>
                      ✓ Already added
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div style={{
        borderTop: '1px solid #e2e8f0',
        paddingTop: '16px',
        marginTop: '16px'
      }}>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
          Selected Service Cards
        </h3>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
          Manage your selected services below. You can also add custom service cards that aren't on the Services Page.
        </p>
        {/* Render the default array input */}
        {props.renderDefault(props)}
      </div>
    </div>
  )
}

