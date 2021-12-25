import { createClient } from '@supabase/supabase-js'
import { useEffect } from 'react'
import type { Session } from '@supabase/supabase-js'
import { useLocalStorage } from '@lib/hooks/useLocalStorage'
import Router from 'next/router'

const supabaseUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl(), supabaseAnonKey())

export const useAuth = () => {
	const [session, setSession] = useLocalStorage<null | Session>('session', null)

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	const signInGithub = async () => {
		await supabase.auth.signIn({ provider: 'github'})
	}

	const isExistSession = () => {
		return supabase.auth.session()
	}

	const navigationGuard = () => {
		if (session === null) {
			signInGithub()
		} else {
			if (session.user?.email !== 'qualidea01@gmail.com') {
				Router.push('/')
			}
		}
	}

	return {
		signInGithub,
		session,
		isExistSession,
		navigationGuard
	}
}