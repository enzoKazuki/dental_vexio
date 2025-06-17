"use client";

import style from "@/style/sass/components/_sidebar.module.scss";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context";

export const Sidebar = () => {
	const { isHidden } = useSidebar();

	const router = useRouter();

	const clickBox = (event: MouseEvent) => {
		const target = event.currentTarget as HTMLDivElement;
		const data = target.parentElement!.dataset.status;

		if (data == "2") {
			target.parentElement!.setAttribute("data-status", "1");
		}
		else {
			target.parentElement!.setAttribute("data-status", "2");
		}
	}

	const clickRedirect = (event: MouseEvent) => {
		const target = event.currentTarget as HTMLDivElement;
		const link = target.dataset.link as string;

		router.push(`${link}`);
	}

	return (
	<div className={style.root} data-status={isHidden ? "2" : "1"}>
			<div className={style.body}>
				<div className={style.boxRoot}>
					<div className={style.box} onClick={clickBox}>
						<div className={style.icon} />
						<span className={style.text}>
							Agenda
						</span>
					</div>
					<div className={style.list}>
						<div className={style.item} data-link="/agendamento" onClick={clickRedirect}>
							<span className={style.text}>
								Painel
							</span>
						</div>
						<div className={style.item} data-link="/agendamento/add" onClick={clickRedirect}>
							<span className={style.text}>
								Adicionar agendamento
							</span>
						</div>
					</div>
				</div>
				<div className={style.boxRoot}>
					<div className={style.box} onClick={clickBox}>
						<div className={style.icon} />
						<span className={style.text}>
							Pacientes
						</span>
					</div>
					<div className={style.list}>
						<div className={style.item} data-link="/paciente" onClick={clickRedirect}>
							<span className={style.text}>
								Painel
							</span>
						</div>
						<div className={style.item} data-link="/paciente/add" onClick={clickRedirect}>
							<span className={style.text}>
								Adicionar paciente
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}