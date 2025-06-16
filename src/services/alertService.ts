let setAlertFn: ((text: string, type: "sucess" | "warning" | "error", timing?: number) => void) | null = null;

export const alertService = {
	setAlert: (text: string, type: "sucess" | "warning" | "error", timing?: number) => {
		if (setAlertFn) setAlertFn(text, type, timing);
	},
	register: (fn: (text: string, type: "sucess" | "warning" | "error", timing?: number) => void) => {
		setAlertFn = fn;
	}
};
