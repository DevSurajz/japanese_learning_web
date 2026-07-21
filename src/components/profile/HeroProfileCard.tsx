import { motion } from 'motion/react'
import { getLevelInfo } from '@/lib/xp'

interface HeroProfileCardProps {
  profile: Record<string, any>
  levelInfo: ReturnType<typeof getLevelInfo>
  onEditClick: () => void
}

export default function HeroProfileCard({ profile, levelInfo, onEditClick }: HeroProfileCardProps) {
  const joinDate = new Date(profile.created_at ?? Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div style={{
      background: 'var(--bg-primary)',
      backgroundImage: 'linear-gradient(to right, var(--bg-primary), rgba(255, 255, 255, 0)), url("/profile_torii.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'right center',
      backgroundRepeat: 'no-repeat',
      border: '1px solid var(--border-color)',
      borderRadius: 24,
      padding: '32px 32px',
      display: 'flex',
      gap: 24,
      alignItems: 'center',
      flexWrap: 'wrap',
      boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background abstract shape for premium feel */}
      <div style={{
        position: 'absolute', top: -50, right: -50, width: 200, height: 200,
        background: 'radial-gradient(circle, var(--border-color) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <img
        src={profile.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${profile.display_name ?? profile.email}`}
        alt="avatar"
        style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
      />
      <div style={{ flex: 1, minWidth: 240 }}>
        <h1 style={{ fontFamily: 'var(--font-inter)', fontSize: 28, fontWeight: 500, margin: '0 0 4px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {profile.display_name ?? 'Learner'}
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
          @{profile.username ?? profile.email.split('@')[0]}
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            display: 'inline-flex', padding: '4px 10px', borderRadius: 6, background: 'var(--bg-card)',
            fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 11, letterSpacing: '0.05em', color: 'var(--text-secondary)'
          }}>
            LEVEL {levelInfo.current.level} • {levelInfo.current.title.toUpperCase()}
          </div>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'var(--text-secondary)' }}>Joined {joinDate}</span>
        </div>
        {profile.bio && (
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'var(--text-secondary)', margin: '12px 0 0', lineHeight: 1.5, maxWidth: 400 }}>
            {profile.bio}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end', minWidth: 140 }}>
        <motion.button
          whileHover={{ y: -1, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          whileTap={{ y: 0 }}
          onClick={onEditClick}
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-inter)'
          }}
        >
          Edit Profile
        </motion.button>
        <div style={{ textAlign: 'right', width: '100%' }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
            {levelInfo.progressXP} / {levelInfo.neededXP} XP
          </div>
          <div style={{ background: 'var(--border-color)', borderRadius: 999, height: 6, width: '100%', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelInfo.progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', background: 'var(--accent-red)', borderRadius: 999 }}
            />
          </div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>
            {levelInfo.neededXP - levelInfo.progressXP} XP to Level {levelInfo.next?.level ?? 'MAX'}
          </div>
        </div>
      </div>
    </div>
  )
}
