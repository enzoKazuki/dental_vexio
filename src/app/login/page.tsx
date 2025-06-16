"use client";

import style from "@/style/sass/app/_login.module.scss";
import { Input } from "@/components";
import { login } from "@/app/login/actions";
import { startTransition } from "react";
import { useAlert } from "@/context";

export default function Page() {
	const { setAlert } = useAlert();

	const handleSubmit = (formData: FormData) => {
		startTransition(async () => {
			const data = await login(formData);

			if (data.user == null) {
				setAlert("Login inválido.", "error");
			} 
		});
	}

	return (
		<div className={style.root}>
			<div className={style.box}>
				<div className={style.header}>
					<span className={style.title}>
						Login - Vexio
					</span>
				</div>
				<form className={style.body} action={handleSubmit}>
					<div className={style.row}>
						<Input type="text" label="Email" name="email" />
					</div>
					<div className={style.row}>
						<Input type="password" label="Senha" name="password" />
					</div>
					<input 
						type="submit" 
						value="Entrar"
						className={style.btn}
						/>
				</form>
			</div>
		</div>
	)
}