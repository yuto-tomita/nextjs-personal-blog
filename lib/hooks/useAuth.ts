import { createClient } from '@supabase/supabase-js'

const supabaseUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl(), supabaseAnonKey())

export const useAuth = () => {
	const session = () => supabase.auth.session()

	const signInGithub = async () => {
		await supabase.auth.signIn({ provider: 'github'})
	}

	return {
		signInGithub,
		session
	}
}