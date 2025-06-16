import style from "@/style/sass/app/_notFound.module.scss";

export default function NotFound() {
	return (
		<div className={style.root}>
			<span className={style.text}>
				404
			</span>
			<span className={style.sub}>
				Página não encontrada
			</span>
		</div>
	)
}