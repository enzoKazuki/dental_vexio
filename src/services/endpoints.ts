export const UsuarioEP = {
	auth: "usuario/auth",
	check_email: (email: string) => `usuario/check_email/${email}`,
	check_token: "usuario/check_token"
}