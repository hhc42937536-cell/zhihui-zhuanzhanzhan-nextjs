export interface UserProfile {
  id: string
  email: string | null
  username: string | null
  role: string
  pain_coins: number
  wisdom_coins: number
  is_student: boolean
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface PainPoint {
  id: string
  user_id: string
  title: string
  content: string
  category: string | null
  likes: number
  created_at: string
}

export interface Solution {
  id: string
  user_id: string
  pain_point_id: string
  content: string
  level: string
  tps: number
  created_at: string
}

export interface Tool {
  id: string
  user_id: string
  name: string
  description: string | null
  url: string | null
  downloads: number
  created_at: string
}

export interface CoinTransaction {
  id: string
  user_id: string
  amount: number
  coin_type: 'pain' | 'wisdom'
  reason: string | null
  created_at: string
}
