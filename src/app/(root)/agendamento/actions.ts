'use server'

import { createClient } from '@/utils/supabase/server'

export async function get(dataInicio?: Date, dataFim?: Date) {
	const supabase = await createClient()
	
	const params = (dataInicio && dataFim) ? {
		_dtinicio: dataInicio,
		_dtfim: dataFim
	} : {};

	const { data } = await supabase.rpc("func_agendamento_sel", params);

	return data;
}