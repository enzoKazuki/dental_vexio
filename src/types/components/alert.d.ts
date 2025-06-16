export type AlertProps = {
	type: "warning" | "sucess" | "error",
	message: string,
	timing?: number,
	closeFunction: () => void
}