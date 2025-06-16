"use client"

import style from "@/style/sass/components/_header.module.scss";
import { useSidebar } from "@/context";

export const Header = () => {
	const { isHidden, setHidden } = useSidebar();

	return (
		<div className={style.root}>
			<div className={style.menuIcon} onClick={() => setHidden(!isHidden)} />
		</div>
	)
}