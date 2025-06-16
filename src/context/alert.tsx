"use client"

import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from '@/components';
import { AlertContextType } from '@/types';
import { alertService } from '@/services';

export const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [alertText, setAlertText] = useState<string | null>(null);
	const [alertType, setAlertType] = useState<"sucess" | "warning" | "error" | null>(null);
	const [alertTiming, setAlertTiming] = useState<number | null>(null);

	const setAlert = (text: string, type: "sucess" | "warning" | "error", timing?: number) => {
		if (!showAlert) {
			setShowAlert(true);
			setAlertText(text);
			setAlertType(type);
			setAlertTiming(timing ?? 10000);
		}
	}

	const closeFunction = () => {
		setShowAlert(false);
		setAlertText(null);
		setAlertType(null);
		setAlertTiming(null);
	}

	useEffect(() => {
		alertService.register(setAlert);
	}, []);

   return (
		<AlertContext.Provider value={{setAlert}}>
			{showAlert && <Alert message={alertText!} timing={alertTiming!} type={alertType!} closeFunction={closeFunction} />}

			{children}
		</AlertContext.Provider>
	);
};

export const useAlert = () => {
   const context = useContext(AlertContext);

   if (!context) throw new Error("useAlert must be used within an AlertProvider");
	else return context;
};