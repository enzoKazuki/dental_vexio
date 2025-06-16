export interface IUserAuthContext {
	email?: string,
	id?: string,
	nome?: string
}

export interface AuthContextType {
	setToken: (token: string) => void,
	logIn: (token: string) => void,
	getToken: () => string | null,
	logOut: () => void,
	userData: IUserAuthContext | null,
	isLog: boolean
}