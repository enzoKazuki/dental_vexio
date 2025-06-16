import axios from "axios";

const base_api = process.env.NEXT_PUBLIC_API_GATEWAY;

export const api = axios.create({
	baseURL: `${base_api}`,
	timeout: 1000000
});

export const headerAuth = (token: string | null) => ({
	headers: {
		Authorization: `Bearer ${token}`
	}
});

api.interceptors.response.use(
	response => response,
	async error => {
		const status = error?.response?.status;

		if (status === 429) {
			await new Promise(resolve => setTimeout(resolve, 1000));

			window.location.reload();

			return;
		}

		return error?.response;
	}
);