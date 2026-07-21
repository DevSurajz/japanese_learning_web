import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { createClient } from '@/utils/supabase/client'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: Record<string, any>
  onProfileUpdate: (updatedProfile: Record<string, any>) => void
}

export default function EditProfileModal({ isOpen, onClose, profile, onProfileUpdate }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    bio: profile?.bio || '',
    avatar_url: profile?.avatar_url || '',
    preferred_language: profile?.preferred_language || 'en',
    timezone: profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('Not authenticated')

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          preferred_language: formData.preferred_language,
          timezone: formData.timezone,
        })
        .eq('id', user.id)
        .select()
        .single()

      if (updateError) throw updateError

      onProfileUpdate(data)
      setSuccess('Profile updated successfully!')
      setTimeout(() => {
        onClose()
        setSuccess('')
      }, 1500)
    } catch (err: unknown) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-primary)", borderRadius: 24, padding: '32px', 
              width: '90%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto',
              boxShadow: '0 24px 48px rgba(0,0,0,0.1)', fontFamily: "var(--font-inter)"
            }}
          >
            <h2 style={{ fontSize: 24, fontWeight: 500, margin: '0 0 24px', color: "var(--text-primary)", letterSpacing: '-0.02em' }}>
              Edit Profile
            </h2>

            {error && (
              <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '12px 16px', borderRadius: 8, fontSize: 13, marginBottom: 20 }}>
                {error}
              </div>
            )}
            
            {success && (
              <div style={{ background: '#D1FAE5', color: '#065F46', padding: '12px 16px', borderRadius: 8, fontSize: 13, marginBottom: 20 }}>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 8 }}>Display Name</label>
                  <input
                    name="display_name"
                    value={formData.display_name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: "1px solid var(--border-color)", fontSize: 14, outline: 'none', transition: 'border-color 0.2s', background: "var(--bg-primary)" }}
                    onFocus={e => e.target.style.borderColor = '#0A0A0A'}
                    onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 8 }}>Avatar URL</label>
                  <input
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: "1px solid var(--border-color)", fontSize: 14, outline: 'none', transition: 'border-color 0.2s', background: "var(--bg-primary)" }}
                    onFocus={e => e.target.style.borderColor = '#0A0A0A'}
                    onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 8 }}>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: "1px solid var(--border-color)", fontSize: 14, outline: 'none', resize: 'vertical', transition: 'border-color 0.2s', background: "var(--bg-primary)" }}
                  placeholder="Tell us a bit about your Japanese learning journey..."
                  onFocus={e => e.target.style.borderColor = '#0A0A0A'}
                  onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 8 }}>Language</label>
                  <select
                    name="preferred_language"
                    value={formData.preferred_language}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: "1px solid var(--border-color)", fontSize: 14, outline: 'none', transition: 'border-color 0.2s', background: "var(--bg-primary)", cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = '#0A0A0A'}
                    onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 8 }}>Timezone</label>
                  <input
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: "1px solid var(--border-color)", fontSize: 14, outline: 'none', transition: 'border-color 0.2s', background: "var(--bg-primary)" }}
                    onFocus={e => e.target.style.borderColor = '#0A0A0A'}
                    onBlur={e => e.target.style.borderColor = '#EAEAEA'}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24, paddingTop: 24, borderTop: '1px solid #F5F5F5' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{ padding: '10px 24px', borderRadius: 8, border: "1px solid var(--border-color)", background: "var(--bg-primary)", fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F9F9F9'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#0A0A0A', color: 'white', fontSize: 14, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'background 0.2s' }}
                  onMouseEnter={e => !loading && (e.currentTarget.style.background = '#222')}
                  onMouseLeave={e => !loading && (e.currentTarget.style.background = '#0A0A0A')}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
