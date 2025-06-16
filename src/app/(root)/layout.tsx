import style from "@/style/sass/layout.module.scss";
import { Sidebar, Header } from "@/components"
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
	return (
		<>
			<title>Vexio</title>
			<div className={style.root}>
				<Sidebar />
				<div className={style.main}>
					<Header />
					<div className={style.content}>
						{children}
					</div>
				</div>
			</div>
		</>
	)
}