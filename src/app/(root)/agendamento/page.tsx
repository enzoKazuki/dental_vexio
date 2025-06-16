"use client";

import style from "@/style/sass/app/_agendamento.module.scss"
import { startTransition, useEffect, useState, MouseEvent } from "react";
import { get } from "./actions";

export default function Page() {
	const [dados, setDados] = useState<any[]>([]);
	const [dataStart, setDataStart] = useState<Date | null>();
	const [dataEnd, setDataEnd] = useState<Date | null>();
	const [periodo, setPeriodo] = useState<any>(1);
	const [mesList] = useState<string[]>([
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro"
	]);
	const [semanaList] = useState<string[]>([
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado"
	])

	const clickPeriodo = (event: MouseEvent) => {
		const target = event.currentTarget as HTMLDivElement;
		const dataIndex = target.dataset.index;

		setPeriodo(dataIndex);

		if (dataIndex == "1") {
			loadDataRange(new Date(), dataIndex);
		}
		else {
			loadDataRange(dataStart!, dataIndex);
		}
	}

	const loadDataRange = (act: Date, _periodo?: any) => {
		const weekday = act.getDay();
		let startData = new Date(act);
		let endData = new Date(act);

		switch (_periodo != null ? parseFloat(_periodo) : parseFloat(periodo)) {
			case 1: {
				startData.setDate(act.getDate());
				endData.setDate(act.getDate());

				break;
			}
			case 2: {
				const lastday = 6;
				const dif = lastday - weekday;
				const startDay = act.getDate() - weekday;
				const endDay = act.getDate() + dif;

				if ((act?.getDate() + dif) > new Date(startData?.getMonth()! + 1).getDate()) {
					endData.setMonth(startData?.getMonth()! + 1);
					endData.setDate(dif);

					console.log(endData);
				}
				else {
					endData.setDate(endDay);
				}

				startData.setDate(startDay);

				break;
			}
			case 3: {
				startData.setDate(1);
				endData.setDate(new Date(act.getFullYear(), act.getMonth() + 1, 0).getDate());

				break;
			}
		}

		setDataStart(startData);
		setDataEnd(endData);
	}

	const movePeriodo = (cursor: number) => {
		const data = new Date(dataStart!);
		let newData = new Date(data);

		switch (Number(cursor)) {
			case -1: {
				switch (Number(periodo)) {
					case 1: {
						newData.setDate(data.getDate() - 1);

						loadDataRange(newData);

						break;
					}
					case 2: {
						newData.setDate(data.getDate() - 6);

						loadDataRange(newData);

						break;
					}
					case 3: {
						newData = new Date(data.getFullYear(), data.getMonth() - 1, 1);

						loadDataRange(newData);

						break;
					}
				};

				break;
			}
			case 1: {
				switch (Number(periodo)) {
					case 1: {
						newData.setDate(dataEnd!.getDate() + 1);

						loadDataRange(newData);

						break;
					}
					case 2: {
						const _ = new Date(dataEnd!);

						_.setDate(dataEnd!.getDate() + 1)

						loadDataRange(_);

						break;
					}
					case 3: {
						newData = new Date(data.getFullYear(), data.getMonth() + 1, 1);
						
						loadDataRange(newData);

						break;
					}
				};

				break;
			}
		}
	}

	useEffect(() => {
		startTransition(async () => {
			const data = await get();

			setDados(data ?? []);

			console.log(data);
		})
	}, [])

	useEffect(() => {
		if (dataStart == null && dataEnd == null) {
			const act = new Date();
			loadDataRange(act);
		}
		else {
			console.log(dataStart);
			console.log(dataEnd);

		}
	}, [dataStart, dataEnd])

	return (
		<div className={style.root}>
			<div className={style.header}>
				<span className={style.title}>
					Agendamentos
				</span>
				<div className={style.division} />
				<button className={style.btn}>
					Adicionar agendamento
				</button>
			</div>
			
			<div className={style.body}>
				<div className={style.agendaRoot}>
					<div className={style.header}>
						<div className={style.icon} />
						<span className={style.title}>
							{dataStart?.getDate() != dataEnd?.getDate() ?
								<>{dataStart?.getDate()} - {dataEnd?.getDate()} </>
							:
								<>{dataStart?.getDate()}</>
							}{" "}
							{mesList[dataEnd?.getMonth() ?? "0"]} {" "}
							{dataStart?.getFullYear()} 
						</span>
						<div className={style.controlBtns}>
							<div className={style.btn} data-style="1" onClick={() => movePeriodo(-1)} /> 
							<div className={style.btn} data-style="2" onClick={() => movePeriodo(1)} />
						</div>
						<div className={style.selectList}>
							<div className={style.item} data-index={1} onClick={clickPeriodo} data-selected={periodo == 1}>
								<span className={style.text}>
									Dia
								</span>
							</div>
							<div className={style.item} data-index={2} onClick={clickPeriodo} data-selected={periodo == 2}>
								<span className={style.text}>
									Semana
								</span>
							</div>
							<div className={style.item} data-index={3} onClick={clickPeriodo} data-selected={periodo == 3}>
								<span className={style.text}>
									Mês
								</span>
							</div>
						</div>
					</div>
					<div className={style.body}>
						{Number(periodo) == 2 &&
							<>
								{[...Array(dataEnd?.getDay()! + 1)].map((val, index) => (
									<div className={style.col} key={index}>
										<div className={style.header}>
											<span className={style.textDay}>
												{semanaList[index]}
											</span>
											<span className={style.textDate}>
												{(Number(dataStart?.getDate() ?? "1") + index) > new Date(dataStart?.getMonth()! + 1).getDate() ?
													<>
														{((Number(dataStart?.getDate() ?? "1") + index) - new Date(dataStart?.getMonth()! + 1).getDate())}
														/
														{(Number(dataStart?.getMonth()) + 1)}
													</>
												:
													<>
														{(Number(dataStart?.getDate() ?? "1") + index)} 
														/
														{dataStart?.getMonth()}
													</>
												}
												
											</span>
										</div>
									</div>
								))}
							</>
						}
					</div>
				</div>
			</div>
		</div>
	)
}