"use client"

import style from "@/style/sass/components/_select.module.scss";
import { SelectProps } from "@/types";
import { MouseEvent, useEffect, useRef, useState } from "react";

export const Select = ({ label, optionList, optionId, setId, reset, setValue, defaultValueIndex, placeholder, textEmp, widthCem, mh }: SelectProps) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(defaultValueIndex ?? -1);
	const [showList, setShowList] = useState<boolean>(false);
	const [_reset, setReset] = useState<boolean>(true);

	const listRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLDivElement | null>(null);

	const clickOption = (event: MouseEvent) => {
		const target = event.currentTarget as HTMLElement;
		const value = target.dataset.value!;
		const id = target.dataset.id!;
		const index = parseFloat(target.dataset.index!);

		if (setId) {
			setId(id);
		}

		setValue(value);
		setSelectedIndex(index);
		listRef.current!.blur()
	}

	const handleFocus = () => {
		setShowList(true);
	}

	const handleBlur = () => {
		setShowList(false);
	}

	const handleDown = () => {
		if (!showList) {
			setTimeout(() => listRef.current!.focus(), 1);
		}
	}

	useEffect(() => {
		if (reset != _reset) {
			setSelectedIndex(-1);
			setReset(reset == true);
		}
	}, [reset])
	
	useEffect(() => {
		new ResizeObserver(() => {
			const list = listRef.current;
			const input = inputRef.current;

			if (list && input) {
				input.style.width = `${list.getBoundingClientRect().width - 4}px`;

				if (input?.clientWidth > (list.getBoundingClientRect().width - 4)) {
					list.style.width = `${input?.clientWidth + 4}px`;
				}
			}
		}).observe(document.body);
	}, [])

	useEffect(() => {
		if (listRef.current) {
			new ResizeObserver(() => {
				const list = listRef.current;
				const input = inputRef.current;

				if (list && input) {
					input.style.width = `${list.getBoundingClientRect().width - 4}px`;

					if (input?.clientWidth > (list.getBoundingClientRect().width - 4)) {
						list.style.width = `${input?.clientWidth + 4}px`;
					}
				}
			}).observe(listRef.current);
		}
	}, [listRef])

	useEffect(() => {
		setSelectedIndex(defaultValueIndex != null ? defaultValueIndex : -1);
	}, [defaultValueIndex])

	return (
		<div className={style.root} data-w100={widthCem == true}>
			{label &&
				<span className={style.label}>
					{label}
				</span>
			}
			<div className={style.input} ref={inputRef} onMouseDown={handleDown}>
				<span className={style.text}>
					{(selectedIndex != -1 && optionList.length > 0) ? optionList[selectedIndex] : (placeholder ?? "Selecione uma opção")}
				</span>
				<div className={style.icon} />
			</div>
			<div className={style.list} ref={listRef} data-hidden={showList == false} tabIndex={-1} onFocus={handleFocus} onBlur={handleBlur} style={{maxHeight:`${mh ? mh + "px" : "200px"}`}}>
				{optionList.map((option, index) => (
					<div key={index} data-id={optionId ? optionId[index] : null} className={style.option} data-index={index} onClick={clickOption} data-value={option} data-selected={index == selectedIndex}>
						<span className={style.text}>
							{option}
						</span>
					</div>
				))}
				{(textEmp && optionList.length == 0) && 
					<div className={style.option} data-style={2}>
						<span className={style.text}>
							{textEmp}
						</span>
					</div>
				}
			</div>
		</div>
	)
}