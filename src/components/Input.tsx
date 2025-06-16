import style from "@/style/sass/components/_input.module.scss";
import { InputProps } from "@/types";

export const Input = ({ type, label, id, name, placeholder, onChange, autoFocus }: InputProps) => {
	return (
		<div className={style.root}>
			{label &&
				<label htmlFor={id ?? name} className={style.label}>
					{label}
				</label>
			}

			<input className={style.input} type={type} id={id ?? name} name={name} placeholder={placeholder} onChange={onChange} autoFocus={autoFocus} spellCheck="false" />
		</div>
	)
}