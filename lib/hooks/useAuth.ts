import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

const supabaseUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl(), supabaseAnonKey())

export const useAuth = () => {
	const signInGithub = async () => {
		await supabase.auth.signIn({ provider: 'github'})
	}

	const guard = () => {
		return !!localStorage.getItem('accessToken')
	}

	return {
		signInGithub,
		guard
	}
}