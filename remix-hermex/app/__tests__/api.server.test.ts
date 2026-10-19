import { afterEach, describe, expect, it, vi } from 'vitest';
import { api } from '~/services/api.server';

afterEach(() => {
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

describe('api.server', () => {
	it('codifica o id no path', async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response('{"id":1}', { status: 200 }));
		vi.stubGlobal('fetch', fetchMock);
		await api.getCarById('1/../x');
		expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:3001/car/1%2F..%2Fx');
	});

	it('devolve 503 genérico sem vazar a URL interna', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED')));
		const error = await api.getCars().catch((e) => e);
		expect(error).toBeInstanceOf(Response);
		expect(error.status).toBe(503);
		expect(await error.text()).not.toContain('localhost');
	});

	it('propaga o status do upstream sem expor a URL', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 404 })));
		const error = await api.getCarById('99').catch((e) => e);
		expect(error.status).toBe(404);
		expect(await error.text()).not.toContain('localhost');
	});
});
