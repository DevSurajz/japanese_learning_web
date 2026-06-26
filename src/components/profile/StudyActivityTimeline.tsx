import { motion } from 'motion/react'

interface TimelineEvent {
  id: string
  title: string
  description: string
  date: string
  icon: string
  type: 'milestone' | 'lesson' | 'review'
}

export default function StudyActivityTimeline() {
  // Mock data for the timeline
  const events: TimelineEvent[] = [
    { id: '1', title: 'Reached Level 2', description: 'Earned 100 XP to level up.', date: 'Today, 2:30 PM', icon: '⭐', type: 'milestone' },
    { id: '2', title: 'Completed Hiragana', description: 'Mastered all 46 basic characters.', date: 'Yesterday', icon: '✍', type: 'milestone' },
    { id: '3', title: 'Finished Lesson 5', description: 'Introductions and Greetings', date: 'Oct 12', icon: '📚', type: 'lesson' },
    { id: '4', title: 'Learned 12 Kanji', description: 'Numbers 1-10, Hundred, Thousand', date: 'Oct 10', icon: '🈶', type: 'lesson' },
    { id: '5', title: 'Completed JLPT N5 Quiz', description: 'Scored 85%', date: 'Oct 5', icon: '🎯', type: 'review' },
  ]

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
        {/* Vertical line connecting timeline dots */}
        <div style={{ position: 'absolute', left: 19, top: 20, bottom: 20, width: 2, background: '#F5F5F5', zIndex: 0 }} />

        {events.map((event, i) => (
          <div key={event.id} style={{ display: 'flex', gap: 16, position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: 'white', border: '1px solid #EAEAEA',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              {event.icon}
            </div>
            <div style={{ flex: 1, paddingTop: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 500, color: '#0A0A0A', margin: '0 0 2px' }}>{event.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)', margin: 0 }}>{event.description}</p>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(10,10,10,0.4)', whiteSpace: 'nowrap' }}>{event.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button style={{
        width: '100%', marginTop: 24, padding: '10px', background: 'transparent', border: '1px solid #EAEAEA',
        borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'rgba(10,10,10,0.7)', cursor: 'pointer',
      }}>
        View All Activity
      </button>
    </div>
  )
}
