'use server'

import { createClient } from '@/utils/supabase/server'

export async function add(form: FormData) {
	const supabase = await createClient()

	const _nome = form.get("nome");
	const _cpf = form.get("cpf");
	const _rg = form.get("rg");
	const _sexo = form.get("sexo");
	const _estado_civil = form.get("estado_civil");
	const _data_nascimento = form.get("data_nascimento");
	const _email = form.get("email");
	const _celular = form.get("celular");
	const _cep = form.get("cep");
	const _estado = form.get("estado");
	const _cidade = form.get("cidade");
	const _bairro = form.get("bairro");
	const _endereco = form.get("endereco");
	const _numero = form.get("numero");
	const _complemento = form.get("complemento");
	const _convenio = form.get("convenio");
	const _especialidade = form.get("especialidade");
	const _indicacao = form.get("indicacao");

	let params = {}
	
	if (_nome == null || _nome?.toString().trim() == "") {
		return { erro: "O nome é obrigatório.", name: "nome", value: _nome?.toString().trim()};
	}
	if (_cpf == null || _cpf?.toString().trim() == "") {
		return { erro: "O CPF é obrigatório.", name: "cpf", value: _cpf?.toString().trim()};
	}
	if (_rg == null || _rg?.toString().trim() == "") {
		return { erro: "O RG é obrigatório.", name: "rg", value: _rg?.toString().trim()};
	}
	if (_data_nascimento == null || _data_nascimento?.toString().trim() == "") {
		return { erro: "A data de nascimento é obrigatória.", name: "data_nascimento", value: _data_nascimento?.toString().trim()};
	}
	if (_celular == null || _celular?.toString().trim() == "") {
		return { erro: "O celular é obrigatório.", name: "celular", value: _celular?.toString().trim()};
	}
	if (_cep == null || _cep?.toString().trim() == "") {
		return { erro: "O Cep é obrigatório.", name: "cep", value: _cep?.toString().trim()};
	}
	else {
		params = {
			_cpf: _cpf,
			_nome: _nome,
			_rg: _rg,
			_data_nascimento: _data_nascimento,
			_celular: _celular,
			_cep: _cep,
			_email: _email,
			_estado_civil: _estado_civil,
			_sexo: _sexo,
			_estado: _estado,
			_cidade: _cidade,
			_bairro: _bairro,
			_endereco: _endereco,
			_numero: _numero,
			_complemento: _complemento,
			_convenio: _convenio,
			_especialidade: _especialidade,
			_indicacao: _indicacao
		};

		const { data, error } = await supabase.rpc("proc_paciente_ins", params);

		return { sucesso: "Paciente cadastrado com sucesso." };
	}
}
