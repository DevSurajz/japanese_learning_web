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
      background: 'linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.75)), url("/profile_torii.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'right center',
      backgroundRepeat: 'no-repeat',
      border: '1px solid #EAEAEA',
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
        background: 'radial-gradient(circle, rgba(10,10,10,0.03) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <img
        src={profile.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${profile.display_name ?? profile.email}`}
        alt="avatar"
        style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '1px solid #EAEAEA' }}
      />
      <div style={{ flex: 1, minWidth: 240 }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 4px', color: '#0A0A0A', letterSpacing: '-0.02em' }}>
          {profile.display_name ?? 'Learner'}
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.6)', margin: '0 0 12px' }}>
          @{profile.username ?? profile.email.split('@')[0]}
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            display: 'inline-flex', padding: '4px 10px', borderRadius: 6, background: 'rgba(10,10,10,0.04)',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: '0.05em', color: 'rgba(10,10,10,0.7)'
          }}>
            LEVEL {levelInfo.current.level} • {levelInfo.current.title.toUpperCase()}
          </div>
          <span style={{ fontSize: 12, color: 'rgba(10,10,10,0.4)' }}>Joined {joinDate}</span>
        </div>
        {profile.bio && (
          <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.7)', margin: '12px 0 0', lineHeight: 1.5, maxWidth: 400 }}>
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
            background: 'white',
            border: '1px solid #EAEAEA',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 500,
            color: '#0A0A0A',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'inherit'
          }}
        >
          Edit Profile
        </motion.button>
        <div style={{ textAlign: 'right', width: '100%' }}>
          <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.5)', marginBottom: 4 }}>
            {levelInfo.progressXP} / {levelInfo.neededXP} XP
          </div>
          <div style={{ background: '#F5F5F5', borderRadius: 999, height: 6, width: '100%', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelInfo.progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', background: '#0A0A0A', borderRadius: 999 }}
            />
          </div>
          <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.4)', marginTop: 6 }}>
            {levelInfo.neededXP - levelInfo.progressXP} XP to Level {levelInfo.next?.level ?? 'MAX'}
          </div>
        </div>
      </div>
    </div>
  )
}
