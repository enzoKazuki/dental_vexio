'use server'

import { createClient } from '@/utils/supabase/server'

export async function get(pagina?: number) {
	const supabase = await createClient()
	
	const params = {_page: pagina};

	const { data } = await supabase.rpc("func_paciente_sel", params);

	return data;
}

export async function getQntPagina() {
	const supabase = await createClient()
	
	const params = {};

	const { data } = await supabase.rpc("func_pacientepagina_sel", params);

	return data;
}