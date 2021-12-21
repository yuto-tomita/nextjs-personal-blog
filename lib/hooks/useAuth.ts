import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import type { Session } from '@supabase/supabase-js'

const supabaseUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl(), supabaseAnonKey())

export const useAuth = () => {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	const signInGithub = async () => {
		await supabase.auth.signIn({ provider: 'github'})
	}

	return {
		signInGithub,
		session
	}
}