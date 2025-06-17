import style from "@/style/sass/layout.module.scss";
import { Sidebar, Header } from "@/components"
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
	return (
		<>
			<title>Vexio</title>
			<div className={style.root}>
				<Header />
				<div className={style.main}>
					<Sidebar />
					<div className={style.content}>
						{children}
					</div>
				</div>
			</div>
		</>
	)
}