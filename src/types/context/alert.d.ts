export type AlertContextType = {
	setAlert: (text: string, type: "sucess" | "warning" | "error", timing?: number) => void;
}