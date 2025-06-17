"use client";

import style from "@/style/sass/app/_paciente_add.module.scss";
import { FormEvent, MouseEvent, startTransition, useEffect, useState } from "react";
import { add } from "./actions";
import { Input } from "@/components";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context";

export default function Page() {
	const { setAlert } = useAlert();

	const router = useRouter();

	const [fallback, setFallback] = useState<boolean>(false);
	const [erroName, setErroName] = useState<string | null>(null);
	const [erroValue, setErroValue] = useState<string | null>(null);
	const [erro, setErro] = useState<string | null>(null);

	const submitForm = async (event: FormEvent) => {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;
		
		const data = await add(new FormData(form));
		
		if (data.erro != null) {
			setErro(data.erro);
			setErroName(data.name)
			setErroValue(data.value?.toString() ?? "");
		}
		else if (data.sucesso) {
			setAlert("Sucesso.", "sucess");
			router.push("/paciente");
		}
	}
	
	const submitChange = (event: FormEvent) => {
		const target = event.currentTarget as HTMLFormElement;

		if (erroName && target[erroName]?.value.toString() != erroValue) {
			setErro(null);
			setErroName(null);
		}
	}

	return (
		<div className={style.root}>
			<div className={style.header}>
				<span className={style.title}>
					Adicionar Paciente
				</span>
				{fallback && 
					<>
						<div className={style.division} />
						<div className={style.loading} />
					</>
				}
			</div>
			
			<form className={style.body} onSubmit={submitForm} onChange={submitChange}>
				<div className={style.row}>
					<Input type="text" label="Nome completo" name="nome" placeholder="João Silva" erro={erroName == "nome" ? erro : null} />
					<Input type="text" label="CPF" name="cpf" placeholder="123-456-789.10" erro={erroName == "cpf" ? erro : null} />
					<Input type="text" label="RG" name="rg" placeholder="12.345.678-9" erro={erroName == "rg" ? erro : null} />
				</div>
				<div className={style.row}>
					<Input type="text" label="Sexo" name="sexo" placeholder="yx" erro={erroName == "sexo" ? erro : null} />
					<Input type="text" label="Estado civil" name="estado_civil" placeholder="Solteiro(a)" erro={erroName == "estado_civil" ? erro : null} />
					<Input type="date" label="Data de nascimento" name="data_nascimento" erro={erroName == "data_nascimento" ? erro : null} />
				</div>
				<div className={style.division} />
				<div className={style.row}>
					<Input type="email" label="Email" name="email" placeholder="exemplo@teste.com" erro={erroName == "email" ? erro : null} />
					<Input type="text" label="Celular" name="celular" placeholder="(83) 12345-6789" erro={erroName == "celular" ? erro : null} />
				</div>
				<div className={style.row}>
					<Input type="text" label="Indicação" name="indicacao" placeholder="..." erro={erroName == "indicacao" ? erro : null} />
				</div>
				<div className={style.division} />
				<div className={style.row}>
					<Input type="text" label="Cep" name="cep" placeholder="12345-678" erro={erroName == "cep" ? erro : null} />
					<Input type="text" label="Estado" name="estado" placeholder="Paraíba" erro={erroName == "estado" ? erro : null} />
					<Input type="text" label="Cidade" name="cidade" placeholder="João Pessoa" erro={erroName == "cidade" ? erro : null} />
					<Input type="text" label="Bairro" name="bairro" placeholder="Bessa" erro={erroName == "bairro" ? erro : null} />
				</div>
				<div className={style.row}>
					<Input type="text" label="Endereço" name="endereco" placeholder="Av. Brasil" erro={erroName == "endereco" ? erro : null} />
					<Input type="text" label="Número" name="numero" placeholder="123" erro={erroName == "numero" ? erro : null} />
					<Input type="text" label="Complemento" name="complemento" placeholder="123" erro={erroName == "complemento" ? erro : null} />
				</div>
				<div className={style.division} />
				<div className={style.row}>
					<Input type="text" label="Convênio" name="convenio" placeholder="convenio" erro={erroName == "convenio" ? erro : null} />
					<Input type="text" label="Especialidade" name="especialidade" placeholder="Dentística" erro={erroName == "especialidade" ? erro : null} />
				</div>

				<button className={style.btn} type="submit">
					Cadastrar
				</button>
			</form>
		</div>
	)
}