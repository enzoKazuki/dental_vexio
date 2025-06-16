"use client"

import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContextType, IUserAuthContext } from '@/types';
import { api, headerAuth, UsuarioEP } from '@/services';
import { useRouter, usePathname } from "next/navigation";
import nookies from "nookies";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [userData, setUserData] = useState<IUserAuthContext | null>(null);
	const [isLog, setIsLog] = useState<boolean>(false);
	const router = useRouter();
	const pathname = usePathname();

	const setToken = (token: string) => {
		nookies.set(null, "__tk", token, {
         maxAge: 30 * 24 * 60 * 60,
         path: '/',
      });

		loadAuth();
	}

	const loadAuth = async () => {
		const cookies = nookies.get(null);
      const token = cookies["__tk"];
      const authToken = cookies["__auth__tk"];

		if (authToken) {
			const json = Object.fromEntries(
				Object.entries(JSON.parse(authToken)).map(([k, v]) => [k.toLowerCase(), v])
			);
			nookies.destroy(null, "__auth__tk", { path: "/" });

			if (json) {
				setIsLog(true);
				setUserData({
					id: json.id?.toString(),
					email: json.email?.toString(),
					nome: json.nome?.toString()
				});
			}
			else {
				setIsLog(false);
				setUserData(null);
			}
		}
	}

	const getToken = (): string | null => {
		const cookies = nookies.get(null);
      const token = cookies["__tk"];

		return token || null;
	}

	const logOut = () => {
		nookies.destroy(null, "__tk");

		setIsLog(false);
		setUserData(null);
	}

	const logIn = (token: string) => {
		nookies.set(null, "__tk", token, {
         maxAge: 30 * 24 * 60 * 60,
         path: '/',
      });

		router.push("/");
	}

	useEffect(() => {
		loadAuth();
	}, [pathname])

	return (
		<AuthContext.Provider value={{ getToken, isLog, logOut, setToken, userData, logIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	else return context;
};