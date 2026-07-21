import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function SettingsSection() {
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy' | 'danger'>('account')
  const [loading, setLoading] = useState(false)
  
  const handleSignOut = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'danger', label: 'Danger Zone' },
  ]

  return (
    <div style={{
      background: "var(--bg-primary)",
      border: "1px solid var(--border-color)",
      borderRadius: 16,
      padding: '24px',
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)", margin: '0 0 24px', letterSpacing: '-0.01em' }}>
        Settings
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', gap: 8, borderBottom: "1px solid var(--border-color)", paddingBottom: 16, overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: activeTab === tab.id ? '#FAFAFA' : 'transparent',
                color: activeTab === tab.id ? '#0A0A0A' : 'rgba(10,10,10,0.5)',
                fontWeight: 500,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ minHeight: 200 }}>
          {activeTab === 'account' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
                Manage your account settings and preferences. Profile details can be edited from the top of the page.
              </p>
              <div>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 8,
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
                Notification settings will be available in the next update.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
                Privacy settings will be available in the next update.
              </p>
            </div>
          )}

          {activeTab === 'danger' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 14, color: '#B91C1C', margin: 0 }}>
                Warning: These actions are irreversible.
              </p>
              <div>
                <button
                  style={{
                    padding: '10px 20px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#FEF2F2',
                    color: '#B91C1C',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
