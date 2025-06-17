import style from "@/style/sass/components/_input.module.scss";
import { InputProps } from "@/types";
import { useEffect } from "react";

export const Input = ({ type, label, id, name, step, placeholder, onChange, autoFocus, erro }: InputProps) => {
	return (
		<div className={style.root}>
			{label &&
				<label htmlFor={id ?? name} className={style.label}>
					{label}
				</label>
			}

			<input className={style.input} step={step} type={type} id={id ?? name} name={name} placeholder={placeholder} onChange={onChange} autoFocus={erro != null ? true : autoFocus} spellCheck="false" data-status={erro != null && "error"} />

			{erro &&
				<span className={style.error}>
					{erro}
				</span>
			}
		</div>
	)
}