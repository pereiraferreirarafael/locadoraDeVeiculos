import type { Category, Car } from '~/types';

const DEFAULT_API_BASE_URL = 'http://localhost:3001';
const API_BASE_URL = process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL;
const FETCH_TIMEOUT_MS = 5000;

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`;
	let response: Response;

	try {
		response = await fetch(url, {
			signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
		});
	} catch (error) {
		console.error(`Falha de conexão com a API em ${API_BASE_URL}`, error);
		throw new Response('Serviço temporariamente indisponível.', { status: 503 });
	}

	if (!response.ok) {
		console.error(`Falha ao fazer requisição para ${url}: ${response.status}`);
		throw new Response('Falha ao consultar os dados.', { status: response.status });
	}

	return response.json();
}

export const api = {
	async getCategory(): Promise<Category[]> {
		return fetchAPI<Category[]>('/category');
	},

	async getCategoryById(id: number | string): Promise<Category> {
		return fetchAPI<Category>(`/category/${encodeURIComponent(String(id))}`);
	},

	async getCars(): Promise<Car[]> {
		return fetchAPI<Car[]>('/car');
	},

	async getCarById(id: number | string): Promise<Car> {
		return fetchAPI<Car>(`/car/${encodeURIComponent(String(id))}`);
	},

	async getCarsByCategory(categoryId: number | string): Promise<Car[]> {
		const params = new URLSearchParams({
			categoryId: String(categoryId),
		});
		return fetchAPI<Car[]>(`/car?${params.toString()}`);
	},
};
