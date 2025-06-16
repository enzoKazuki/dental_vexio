'use server'

import { createClient } from '@/utils/supabase/server'

export async function get() {
	const supabase = await createClient()
	
	const { data } = await supabase.rpc("func_agendamento_sel");

	return data;
}