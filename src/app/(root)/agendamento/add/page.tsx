"use client";

import style from "@/style/sass/app/_paciente_add.module.scss";
import { FormEvent, MouseEvent, startTransition, useEffect, useState } from "react";
import { add, getTipo, getSituacao } from "./actions";
import { Input, Select } from "@/components";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context";

export default function Page() {
	const { setAlert } = useAlert();

	const router = useRouter();

	const [fallback, setFallback] = useState<boolean>(false);
	const [erroName, setErroName] = useState<string | null>(null);
	const [erroValue, setErroValue] = useState<string | null>(null);
	const [erro, setErro] = useState<string | null>(null);
	const [tipoList, setTipoList] = useState<any[]>();
	const [situacaoList, setSituacaoList] = useState<any[]>();
	const [tipoSelected, setTipoSelected] = useState<string>();
	const [situacaoSelected, setSituacaoSelected] = useState<string>();

	const _getTipo = () => {
		startTransition(async () => {
			const data = await getTipo();
			
			setTipoList(data! as any[]);
		})
	}

	const _getSituacao = () => {
		startTransition(async () => {
			const data = await getSituacao();
			
			setSituacaoList(data! as any[]);
		})
	}

	const submitForm = async (event: FormEvent) => {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;
	}
	
	const submitChange = (event: FormEvent) => {
		const target = event.currentTarget as HTMLFormElement;

		if (erroName && target[erroName]?.value.toString() != erroValue) {
			setErro(null);
			setErroName(null);
		}
	}

	useEffect(() => {
		_getTipo();
		_getSituacao();
	}, [])

	return (
		<div className={style.root}>
			<div className={style.header}>
				<span className={style.title}>
					Adicionar agendamento
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
					<Input type="date" label="Data" name="dtinicio" erro={erroName == "dtinicio" ? erro : null} />
					<Input type="text" label="Hora inicio" name="dtiniciohora" erro={erroName == "dtiniciohora" ? erro : null} placeholder="14:00" />
					<Input type="text" label="Hora fim" name="dtfimhora" erro={erroName == "dtfimhora" ? erro : null} placeholder="14:30" />
				</div>
				<div className={style.row}>
					<Input type="text" label="Descricao" name="descricao" erro={erroName == "descricao" ? erro : null} placeholder=". . ." />
					<Input type="text" label="ID paciente" name="idpaciente" erro={erroName == "idpaciente" ? erro : null} placeholder="1235" />

					{tipoList && 
						<Select 
							label="Tipo"
							setValue={() => {}}
							setId={setTipoSelected}
							optionId={[...tipoList?.map(t => t.idtipo) as string[]]}
							optionList={[...tipoList?.map(t => t.nome) as string[]]}
						/>
					}
					{situacaoList && 
						<Select 
							label="Tipo"
							setValue={() => {}}
							setId={setSituacaoSelected}
							optionId={[...situacaoList?.map(t => t.idsituacao) as string[]]}
							optionList={[...situacaoList?.map(t => t.nome) as string[]]}
						/>
					}
				</div>

				<button className={style.btn} type="submit">
					Adicionar
				</button>
			</form>
		</div>
	)
}