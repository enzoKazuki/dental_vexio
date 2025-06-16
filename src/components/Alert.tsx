"use client";

import style from "@/style/sass/components/_alert.module.scss";
import { AlertProps } from "@/types";
import { useEffect } from "react";

export const Alert = ({message, type, timing, closeFunction}: AlertProps) => {
	useEffect(() => {
		setTimeout(() => {
		closeFunction();
	}, timing ?? 10000);
	})

	return (
		<div className={style.root} data-type={type}>
			<div className={style.icon} />
			<span className={style.text}>
				{message}
			</span>
			<div className={style.closeBtn} onClick={closeFunction} />
		</div>
	)
}