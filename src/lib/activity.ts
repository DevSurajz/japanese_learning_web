import { createClient } from '@/utils/supabase/client'

export async function logActivity(userId: string, title: string, description: string, activityType: string) {
  if (!userId) return

  const supabase = createClient()
  await supabase.from('activity_logs').insert({
    user_id: userId,
    title,
    description,
    activity_type: activityType,
  })
}
