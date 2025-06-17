"use client";

import style from "@/style/sass/app/_agendamento.module.scss"
import { startTransition, useEffect, useState, MouseEvent } from "react";
import { get } from "./actions";

export default function Page() {
	const [dados, setDados] = useState<any[]>([]);
	const [dataStart, setDataStart] = useState<Date | null>();
	const [dataEnd, setDataEnd] = useState<Date | null>();
	const [periodo, setPeriodo] = useState<any>(1);
	const [timeoutReload, setTimeoutReload] = useState<number>(0);

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
	const [horaList] = useState<string[]>([
		"06:00",
		"07:00",
		"08:00",
		"09:00",
		"10:00",
		"11:00",
		"12:00",
		"13:00",
		"14:00",
		"15:00",
		"16:00",
		"17:00",
		"18:00",
		"19:00",
		"20:00",
		"21:00",
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
		const startData = new Date(act);
		const endData = new Date(act);

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

				endData.setDate(endDay);
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

	const dataIgual = (data: Date, newData: Date) => {
		return (data.getDate() == newData.getDate() && data.getMonth() == newData.getMonth() && data.getFullYear() == newData.getFullYear())
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

	const primeiroDia = (dataBase: Date, dia: number): number => {
		return new Date(
			dataBase.getFullYear(),
			dataBase.getMonth(),
			1 + ((7 + dia - new Date(dataBase.getFullYear(), dataBase.getMonth(), 1).getDay()) % 7)
		).getDate();
	};

	const ultimoDia = (dataBase: Date, dia: number): number => {
		const year = dataBase.getFullYear();
		const month = dataBase.getMonth();
		const lastDate = new Date(year, month + 1, 0);
		const dayOfWeek = lastDate.getDay();

		const diff = (7 + dayOfWeek - dia) % 7;
		return lastDate.getDate() - diff;
	};

	const getTopAgendamento = (data: Date) => {
		const base = horaList.findIndex(h => h == (data.getHours() + ":00")) * 40;
		const variavel = (data.getMinutes() / 60) * 40;

		return base + variavel;
	}

	const getHeightAgendamento = (data: Date, duracao: string) => {
		const base = horaList.findIndex(h => h == (data.getHours() + ":00")) * 40;
		const variavel = (data.getMinutes() / 60) * 40;
		const top = base + variavel;

		console.log(duracao);

		const baseH = horaList.findIndex(h => h == (duracao.split(":")[0] + ":00")) * 40;
		const variavelH = (Number(duracao.split(":")[1]) / 60) * 40;
		const height = baseH + variavelH;

		return height - top;
	}

	useEffect(() => {
		if (dataStart == null && dataEnd == null) {
			const act = new Date();
			loadDataRange(act);
		}
		else {
			if (timeoutReload == 0 && dataStart && dataEnd) {
				setTimeout(() => {
					startTransition(async () => {
						const data = await get(new Date(dataStart.setHours(0)), new Date(dataEnd.setHours(23)));

						setDados(data ?? []);
					})

					setTimeoutReload(0);
				}, 500);

				setTimeoutReload(1);
			}
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
								<>{dataStart?.getDate().toString().padStart(2, "0")} - {dataEnd?.getDate().toString().padStart(2, "0")} </>
							:
								<>{dataStart?.getDate().toString().padStart(2, "0")}</>
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
						{Number(periodo) == 1 &&
							<>
								<div className={style.col} data-indicator>
									<div className={style.header}>
									</div>
									<div className={style.content}>
										{horaList.map((hora, index) => (
											<div className={style.boxHora} key={index}>
												<span className={style.text}>
													{hora}
												</span>
											</div>
										))}
									</div>
								</div>
								<div className={style.col} data-hoje={dataIgual(new Date(), dataStart ?? new Date())}>
									<div className={style.header}>
										<span className={style.textDay}>
											{semanaList[dataStart?.getDay()!]}
										</span>
										<span className={style.textDate}>
											{(Number(dataStart?.getDate() ?? "1")).toString().padStart(2, '0')} 
											/
											{((dataStart?.getMonth() ?? 0) + 1).toString().padStart(2, '0')}
											{dataIgual(new Date(), dataStart ?? new Date()) && " (hoje)"}
										</span>
									</div>
									{horaList.map((hora, index) => (
										<div className={style.boxHora} key={index}>
											<div className={style.sub} />
											<div className={style.sub} />
										</div>
									))}
								</div>
							</>
						}
						{Number(periodo) == 2 &&
							<>
								<div className={style.col} data-indicator>
									<div className={style.header}>
									</div>
									<div className={style.content}>
										{horaList.map((hora, index) => (
											<div className={style.boxHora} key={index}>
												<span className={style.text}>
													{hora}
												</span>
											</div>
										))}
									</div>
								</div>
								{[...Array(dataEnd?.getDay()! + 1)].map((val, index) => (
									<div className={style.col} key={index} data-hoje={dataIgual(new Date(), new Date((dataStart?.getDate() ?? 1) + index))}>
										<div className={style.header}>
											<span className={style.textDay}>
												{semanaList[index]}
											</span>
											<span className={style.textDate}>
												{(Number(dataStart?.getDate() ?? "1") + index) > new Date(dataStart?.getFullYear()!, dataStart?.getMonth()! + 1, 0).getDate() ?
													<>
														{((Number(dataStart?.getDate() ?? "1") + index) - new Date(dataStart?.getFullYear()!, dataStart?.getMonth()! + 1, 0).getDate()).toString().padStart(2, '0')}
														/
														{((Number(dataStart?.getMonth()) + 2)).toString().padStart(2, '0')}
													</>
												:
													<>
														{(Number(dataStart?.getDate() ?? "1") + index).toString().padStart(2, '0')} 
														/
														{((dataStart?.getMonth() ?? 0) + 1).toString().padStart(2, '0')} 
														{dataIgual(new Date(), new Date((dataStart?.getDate() ?? 1) + index)) && " (hoje)"}
													</>
												}
											</span>
										</div>
										<div className={style.content}>
											{horaList.map((hora, index) => (
												<div className={style.boxHora} key={index}>
													<div className={style.sub} />
													<div className={style.sub} />
												</div>
											))}
											{dados?.map((dado, _index) => {
												
												if (new Date(dado.data).getDate() == (dataStart?.getDate()! + index)) return (
													<div 
														className={style.boxAgendamento} 
														key={_index}
														style={{
															top: `${getTopAgendamento(new Date(dado.data))}px`,
															height: `${getHeightAgendamento(new Date(dado.data), dado.duracao)}px`
														}}
													>
														<span className={style.title}>
															{new Date(dado.data).getHours()}:{new Date(dado.data).getMinutes()} - {dado.duracao.split(":")[0]}:{dado.duracao.split(":")[1]}
														</span>
													</div>
												)
											})}
										</div>
									</div>
								))}
							</>
						}
						{Number(periodo) == 3 &&
							<>
								{[...Array(7)].map((val, index) => (
									<div className={style.col} key={index} data-hoje={dataIgual(new Date(), new Date((dataStart?.getDate() ?? 1) + index))}>
										<div className={style.header}>
											<span className={style.textDay}>
												{semanaList[index]}
											</span>
										</div>
										{dataEnd && ((primeiroDia(dataEnd!, index) > index) && primeiroDia(dataEnd!, index) != index + 1) && (
											<div className={style.boxDia} data-difmes>
												<span className={style.textDia}>
													{new Date(dataEnd.getFullYear(), dataEnd.getMonth(), 0).getDate() - ((dataStart?.getDay()! - 1) - index)}
												</span>
											</div>
										)}
										{[...Array(Number(dataEnd?.getDate()!))].map((dia, _index) => {
											const _data = new Date(dataEnd!);

											_data.setDate(_index + 1);

											if (_data.getDay() == index) return (
												<div className={style.boxDia} key={_index}>
													<span className={style.textDia}>
														{_data.getDate()}
													</span>
												</div>
											)
										})}
										{dataEnd && ((ultimoDia(dataEnd!, index) < dataEnd.getDate() && dataEnd.getDay()! < index)) && (
											<div className={style.boxDia} data-difmes>
												<span className={style.textDia}>
													{index - dataEnd.getDay()}
												</span>
											</div>
										)}
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