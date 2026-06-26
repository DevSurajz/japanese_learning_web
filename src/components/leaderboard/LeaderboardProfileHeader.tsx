import { getLevelInfo } from '@/lib/xp'

interface LeaderboardProfileHeaderProps {
  profile: any
  levelInfo: ReturnType<typeof getLevelInfo>
}

export default function LeaderboardProfileHeader({ profile, levelInfo }: LeaderboardProfileHeaderProps) {
  const joinDate = new Date(profile?.created_at ?? Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const displayName = profile?.display_name ?? profile?.email?.split('@')[0] ?? 'Learner'

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background abstract shape for premium feel */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 120, height: 120,
        background: 'radial-gradient(circle, rgba(10,10,10,0.03) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <img
        src={profile?.avatar_url ?? `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`}
        alt="avatar"
        style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '1px solid #EAEAEA', marginBottom: 16 }}
      />
      
      <h2 style={{ fontSize: 20, fontWeight: 500, margin: '0 0 4px', color: '#0A0A0A', letterSpacing: '-0.01em' }}>
        {displayName}
      </h2>
      
      <div style={{
        display: 'inline-flex', padding: '4px 10px', borderRadius: 6, background: 'rgba(10,10,10,0.04)',
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.05em', color: 'rgba(10,10,10,0.7)',
        marginBottom: 8
      }}>
        LEVEL {levelInfo.current.level}
      </div>
      
      <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)', margin: '0 0 12px' }}>
        Beginner Japanese Learner
      </p>
      
      <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.4)' }}>
        Joined {joinDate}
      </div>
    </div>
  )
}
