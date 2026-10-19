import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const result = vi.hoisted(() => ({ value: { data: null as unknown, error: null as unknown } }));
const calls = vi.hoisted(() => ({ eq: [] as unknown[][], from: [] as string[] }));

vi.mock('@supabase/supabase-js', () => {
	const builder: Record<string, unknown> = {
		select: () => builder,
		order: () => builder,
		eq: (...args: unknown[]) => {
			calls.eq.push(args);
			return builder;
		},
		maybeSingle: () => Promise.resolve(result.value),
		then: (resolve: (v: unknown) => unknown) => Promise.resolve(result.value).then(resolve),
	};
	return {
		createClient: () => ({
			from: (table: string) => {
				calls.from.push(table);
				return builder;
			},
		}),
	};
});

import { api } from '~/services/api.server';

const row = {
	id: 1,
	title: 'Fiat Cronos',
	short_title: 'Cronos',
	description: 'Sedan',
	category_id: 1,
	price: 150,
	image: '/x.png',
	specs: null,
	features: ['USB'],
};

beforeEach(() => {
	vi.stubEnv('SUPABASE_URL', 'https://x.supabase.co');
	vi.stubEnv('SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test');
	vi.spyOn(console, 'error').mockImplementation(() => {});
	calls.eq.length = 0;
	calls.from.length = 0;
});

afterEach(() => {
	vi.restoreAllMocks();
	vi.unstubAllEnvs();
});

describe('api.server (Supabase)', () => {
	it('mapeia colunas snake_case para o modelo Car', async () => {
		result.value = { data: [row], error: null };
		const [car] = await api.getCars();
		expect(car).toMatchObject({ shortTitle: 'Cronos', categoryId: 1, price: 150 });
		expect(car.specs).toBeUndefined();
	});

	it('filtra carros por categoria', async () => {
		result.value = { data: [row], error: null };
		await api.getCarsByCategory('2');
		expect(calls.eq).toContainEqual(['category_id', 2]);
	});

	it('devolve 404 quando o registro não existe', async () => {
		result.value = { data: null, error: null };
		const error = await api.getCarById('99').catch((e) => e);
		expect(error.status).toBe(404);
	});

	it('devolve 404 sem consultar o banco para id inválido', async () => {
		const error = await api.getCarById('1/../x').catch((e) => e);
		expect(error.status).toBe(404);
		expect(calls.from).toHaveLength(0);
	});

	it('devolve 503 genérico quando o Supabase falha', async () => {
		result.value = { data: null, error: { message: 'connection refused at db.internal' } };
		const error = await api.getCars().catch((e) => e);
		expect(error.status).toBe(503);
		expect(await error.text()).not.toContain('internal');
	});
});
