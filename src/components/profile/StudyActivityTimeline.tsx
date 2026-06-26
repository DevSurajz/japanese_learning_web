import { motion } from 'motion/react'
import { Trophy, BookOpen, Target, ArrowUpCircle, Activity, Star } from 'lucide-react'

interface ActivityLog {
  id: string
  title: string
  description: string
  activity_type: string
  created_at: string
}

interface Props {
  activityLogs?: ActivityLog[]
}

const getIcon = (type: string) => {
  switch (type) {
    case 'achievement': return <Trophy size={16} strokeWidth={2} />
    case 'lesson': return <BookOpen size={16} strokeWidth={2} />
    case 'quiz': return <Target size={16} strokeWidth={2} />
    case 'level_up': return <ArrowUpCircle size={16} strokeWidth={2} />
    case 'kanji': return <Star size={16} strokeWidth={2} />
    default: return <Activity size={16} strokeWidth={2} />
  }
}

const formatDate = (isoString: string) => {
  const d = new Date(isoString)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function StudyActivityTimeline({ activityLogs = [] }: Props) {

  return (
    <div style={{
      background: 'white',
      border: '1px solid #EAEAEA',
      borderRadius: 16,
      padding: '24px',
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 500, color: '#0A0A0A', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
        Study Activity
      </h2>

      {activityLogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(10,10,10,0.4)', fontSize: 14 }}>
          No activity yet. Start learning to see your progress!
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
            {/* Vertical line connecting timeline dots */}
            <div style={{ position: 'absolute', left: 19, top: 20, bottom: 20, width: 2, background: '#F5F5F5', zIndex: 0 }} />

            {activityLogs.map((event) => (
              <div key={event.id} style={{ display: 'flex', gap: 16, position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', background: 'white', border: '1px solid #EAEAEA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A0A0A',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  {getIcon(event.activity_type)}
                </div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A', margin: '0 0 2px' }}>{event.title}</h3>
                      <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)', margin: 0 }}>{event.description}</p>
                    </div>
                    <span style={{ fontSize: 12, color: 'rgba(10,10,10,0.4)', whiteSpace: 'nowrap' }}>{formatDate(event.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {activityLogs.length >= 20 && (
            <button style={{
              width: '100%', marginTop: 24, padding: '10px', background: 'transparent', border: '1px solid #EAEAEA',
              borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'rgba(10,10,10,0.7)', cursor: 'pointer',
            }}>
              View All Activity
            </button>
          )}
        </>
      )}
    </div>
  )
}
