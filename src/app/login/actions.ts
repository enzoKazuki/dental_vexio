'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
	const supabase = await createClient()
	
	const body = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	const { data } = await supabase.auth.signInWithPassword(body)

  	if (data.user != null) {
		redirect('/');
	}

	return data;
}

// export async function signup(formData: FormData) {
// 	const supabase = await createClient()

// 	// type-casting here for convenience
// 	// in practice, you should validate your inputs
// 	const data = {
// 		email: formData.get('email') as string,
// 		password: formData.get('password') as string,
// 	}

// 	const { error } = await supabase.auth.signUp(data)

// 	if (error) {
// 		redirect('/error')
// 	}

// 	revalidatePath('/', 'layout')
// 	redirect('/')
// }