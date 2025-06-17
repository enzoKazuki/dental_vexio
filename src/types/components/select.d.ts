export type SelectProps = {
	label?: string;
	setValue: (value: string) => void;
	setId?: ((value: string) => void) | null;
	defaultValueIndex?: number;
	optionList: string[];
	placeholder?: string | null;
	optionId?: string[] | null;
	reset?: boolean | null;
	textEmp?: string | null;
	widthCem?: boolean | null;
	mh?: number | null;
}