"use client"

import style from "@/style/sass/components/_header.module.scss";
import { useSidebar } from "@/context";
import { useRouter } from "next/navigation";

export const Header = () => {
	const { isHidden, setHidden } = useSidebar();

	const router = useRouter();

	return (
		<div className={style.root}>
			<div className={style.logo} onClick={() => router.push("/agendamento")} />
			<div className={style.division} />
			<div className={style.menuIcon} onClick={() => setHidden(!isHidden)} />
		</div>
	)
}