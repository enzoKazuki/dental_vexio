"use client";

import style from "@/style/sass/app/_paciente.module.scss";
import { MouseEvent, startTransition, useEffect, useState } from "react";
import { get, getQntPagina } from "./actions";
import { useRouter } from "next/navigation";

export default function Page() {
	const [pacienteList, setPacienteList] = useState<any[] | null>();
	const [qntPagina, setQntPagina] = useState<number>(1);
	const [paginaAtual, setPaginaAtual] = useState<number>(1);
	const [timeoutReload, setTimeoutReload] = useState<number>(0);
	const [fallback, setFallback] = useState<boolean>(false);

	const router = useRouter();

	const clickMove = (event: MouseEvent) => {
		const target = event.currentTarget as HTMLDivElement;
		const index = target.dataset.index;

		if (Number(index) > 0) {
			setPaginaAtual(paginaAtual + 1);
		}
		else {
			setPaginaAtual(paginaAtual - 1);
		}

		setFallback(true);
	}

	useEffect(() => {
		if (timeoutReload == 0 && paginaAtual) {
			setTimeout(() => {
				startTransition(async () => {
					const data = await get(paginaAtual);
					const _qntPagina = await getQntPagina();

					setPacienteList(data ?? []);
					setQntPagina(_qntPagina);
				})
				
				setTimeoutReload(0);
			}, 500);

			setTimeoutReload(1);
		}		
	}, [pacienteList, paginaAtual])

	useEffect(() => {
		setFallback(false);
	}, [pacienteList])

	return (
		<div className={style.root}>
			<div className={style.header}>
				<span className={style.title}>
					Pacientes
				</span>
				<div className={style.division} />
				<button className={style.btn} onClick={() => router.push("/paciente/add")}>
					Adicionar paciente
				</button>
				{fallback && 
					<>
						<div className={style.division} />
						<div className={style.loading} />
					</>
				}
			</div>
			
			<div className={style.body}>
				<div className={style.table}>
					<div className={style.col}>
						<div className={style.header}>
							<span className={style.title}>
								Nome
							</span>
						</div>
						<div className={style.rowList}>
							{pacienteList?.map((p, i) => (
								<div className={style.row} key={i}>
									<span className={style.text}>
										{p.nome}
									</span>
								</div>
							))}
						</div>
					</div>
					<div className={style.col} data-wauto>
						<div className={style.header}>
							<span className={style.title}>
								Celular
							</span>
						</div>
						<div className={style.rowList}>
							{pacienteList?.map((p, i) => (
								<div className={style.row} key={i}>
									<span className={style.text} data-style={p.celular == null ? "2" : "1"}>
										{p.celular == null ? "Em branco" : p.celular}
									</span>
								</div>
							))}
						</div>
					</div>
					<div className={style.col} data-wauto>
						<div className={style.header}>
							<span className={style.title}>
								Email
							</span>
						</div>
						<div className={style.rowList}>
							{pacienteList?.map((p, i) => (
								<div className={style.row} key={i}>
									<span className={style.text} data-style={p.email == null ? "2" : "1"}>
										{p.email == null ? "Em branco" : p.email}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={style.row}>
					<span className={style.textIndicator}>
						{qntPagina} páginas
					</span>
					<div className={style.buttons}>
						<div className={style.move} data-index={-1} onClick={clickMove} data-hidden={paginaAtual == 1} data-disabled={fallback} />
						
						<div className={style.text}>
							{paginaAtual}
						</div>

						<div className={style.move} data-index={1} onClick={clickMove} data-hidden={qntPagina == paginaAtual} data-disabled={fallback} />
					</div>
				</div>
				
			</div>
		</div>
	)
}