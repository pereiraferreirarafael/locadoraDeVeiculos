import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Car, Category } from '~/types';

const FETCH_TIMEOUT_MS = 5000;

type CategoryRow = Category;

interface CarRow {
	id: number;
	title: string;
	short_title: string;
	description: string;
	category_id: number;
	price: number;
	image: string;
	specs: Car['specs'] | null;
	features: string[];
}

let client: SupabaseClient | undefined;

function getClient(): SupabaseClient {
	if (client) return client;

	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_PUBLISHABLE_KEY;

	if (!url || !key) {
		console.error('SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY precisam estar definidas.');
		throw new Response('Serviço mal configurado.', { status: 500 });
	}

	client = createClient(url, key, {
		auth: { persistSession: false, autoRefreshToken: false },
		global: {
			fetch: (input, init) =>
				fetch(input, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) }),
		},
	});
	return client;
}

function toCar(row: CarRow): Car {
	return {
		id: row.id,
		title: row.title,
		shortTitle: row.short_title,
		description: row.description,
		categoryId: row.category_id,
		price: Number(row.price),
		image: row.image,
		specs: row.specs ?? undefined,
		features: row.features,
	};
}

function fail(error: { message: string }): never {
	console.error('Falha ao consultar o Supabase:', error.message);
	throw new Response('Serviço temporariamente indisponível.', { status: 503 });
}

async function selectMany<T>(table: 'car' | 'category', categoryId?: number): Promise<T[]> {
	let query = getClient().from(table).select('*').order('id');
	if (categoryId !== undefined) query = query.eq('category_id', categoryId);

	const { data, error } = await query;
	if (error) fail(error);
	return (data ?? []) as T[];
}

async function selectOne<T>(table: 'car' | 'category', id: number | string): Promise<T> {
	const numericId = Number(id);
	if (!Number.isInteger(numericId) || numericId <= 0) {
		throw new Response('Não encontrado.', { status: 404 });
	}

	const { data, error } = await getClient().from(table).select('*').eq('id', numericId).maybeSingle();
	if (error) fail(error);
	if (!data) throw new Response('Não encontrado.', { status: 404 });
	return data as T;
}

export const api = {
	async getCategory(): Promise<Category[]> {
		return selectMany<CategoryRow>('category');
	},

	async getCategoryById(id: number | string): Promise<Category> {
		return selectOne<CategoryRow>('category', id);
	},

	async getCars(): Promise<Car[]> {
		return (await selectMany<CarRow>('car')).map(toCar);
	},

	async getCarById(id: number | string): Promise<Car> {
		return toCar(await selectOne<CarRow>('car', id));
	},

	async getCarsByCategory(categoryId: number | string): Promise<Car[]> {
		const numericId = Number(categoryId);
		if (!Number.isInteger(numericId)) return [];
		return (await selectMany<CarRow>('car', numericId)).map(toCar);
	},
};
