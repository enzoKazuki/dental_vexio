export type InputProps = {
	type: string;
	label?: string;
	id?: string;
	name?: string;
	step?: number;
	placeholder?: string;
	onChange?: () => void;
	erro?: string | null;
	autoFocus?: boolean;
}