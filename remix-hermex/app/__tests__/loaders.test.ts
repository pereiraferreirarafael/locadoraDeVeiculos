import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('~/services/api.server', () => ({
	api: {
		getCars: vi.fn(),
		getCategory: vi.fn(),
		getCarById: vi.fn(),
		getCategoryById: vi.fn(),
		getCarsByCategory: vi.fn(),
	},
}));

import { loader as carLoader } from '~/routes/car_.$id/route';
import { loader as categoryLoader } from '~/routes/categories_.$id/route';
import { loader as searchLoader } from '~/routes/search/route';
import { api } from '~/services/api.server';

const mocked = vi.mocked(api);
const args = (params: Record<string, string> = {}, url = 'http://x/') =>
	({ params, request: new Request(url) }) as never;

const car = (over = {}) =>
	({
		id: 1,
		title: 'Fiat Argo',
		shortTitle: 'Argo',
		description: 'Compacto',
		categoryId: 1,
		price: 100,
		...over,
	}) as never;

afterEach(() => vi.resetAllMocks());

describe('car loader', () => {
	it('rejeita id inválido com 400', async () => {
		const error = await carLoader(args({ id: '../x' })).catch((e) => e);
		expect(error.status).toBe(400);
	});

	it('propaga 503 em vez de converter em 404', async () => {
		mocked.getCarById.mockRejectedValue(new Response('', { status: 503 }));
		const error = await carLoader(args({ id: '1' })).catch((e) => e);
		expect(error.status).toBe(503);
	});

	it('tolera categoria inexistente', async () => {
		mocked.getCarById.mockResolvedValue(car());
		mocked.getCategoryById.mockRejectedValue(new Response('', { status: 404 }));
		const result = await carLoader(args({ id: '1' }));
		expect(result.categoryName).toBe('Sem categoria');
	});
});

describe('category loader', () => {
	it('rejeita id inválido com 400', async () => {
		const error = await categoryLoader(args({ id: 'abc' })).catch((e) => e);
		expect(error.status).toBe(400);
	});

	it('propaga o status do upstream', async () => {
		mocked.getCategoryById.mockRejectedValue(new Response('', { status: 503 }));
		mocked.getCarsByCategory.mockResolvedValue([]);
		const error = await categoryLoader(args({ id: '1' })).catch((e) => e);
		expect(error.status).toBe(503);
	});
});

describe('search loader', () => {
	it('filtra por título e ignora espaços na query', async () => {
		mocked.getCars.mockResolvedValue([car(), car({ id: 2, title: 'VW Gol', shortTitle: 'Gol', description: 'x' })]);
		mocked.getCategory.mockResolvedValue([]);
		const result = await searchLoader(args({}, 'http://x/search?q=%20argo%20'));
		expect(result.cars).toHaveLength(1);
		expect(result.query).toBe('argo');
	});

	it('limita o tamanho da query', async () => {
		mocked.getCars.mockResolvedValue([]);
		mocked.getCategory.mockResolvedValue([]);
		const result = await searchLoader(args({}, `http://x/search?q=${'a'.repeat(500)}`));
		expect(result.query).toHaveLength(100);
	});

	it('sem query devolve todos', async () => {
		mocked.getCars.mockResolvedValue([car(), car({ id: 2 })]);
		mocked.getCategory.mockResolvedValue([]);
		const result = await searchLoader(args());
		expect(result.cars).toHaveLength(2);
	});
});
