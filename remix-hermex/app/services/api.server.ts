import type { Category, Car } from '~/types';

const DEFAULT_API_BASE_URL = 'http://localhost:3001';
const API_BASE_URL = process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL;

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`;
	let response: Response;

	try {
		response = await fetch(url, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
		});
	} catch {
		throw new Response(
			`Não foi possível conectar na API em ${API_BASE_URL}. Inicie o servidor (porta 3001) e tente novamente.`,
			{ status: 503 },
		);
	}

	if (!response.ok) {
		throw new Response(`Falha ao fazer requisição para ${url}`, {
			status: response.status,
			statusText: response.statusText,
		});
	}

	return response.json();
}

export const api = {
	async getCategory(): Promise<Category[]> {
		return fetchAPI<Category[]>('/category');
	},

	async getCategoryById(id: number | string): Promise<Category> {
		return fetchAPI<Category>(`/category/${id}`);
	},

	async getCars(): Promise<Car[]> {
		return fetchAPI<Car[]>('/car');
	},

	async getCarById(id: number | string): Promise<Car> {
		return fetchAPI<Car>(`/car/${id}`);
	},

	async getCarsByCategory(categoryId: number | string): Promise<Car[]> {
		const params = new URLSearchParams({
			categoryId: String(categoryId),
		});
		return fetchAPI<Car[]>(`/car?${params.toString()}`);
	},
};
