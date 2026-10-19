import { describe, expect, it } from 'vitest';
import { isValidRouteId } from '~/lib/validators';

describe('isValidRouteId', () => {
	it('aceita ids numéricos', () => {
		expect(isValidRouteId('1')).toBe(true);
		expect(isValidRouteId('42')).toBe(true);
	});

	it.each(['', ' ', '../x', '1/../x', 'abc', '-1', '1.5', undefined, 3])(
		'rejeita %s',
		(value) => {
			expect(isValidRouteId(value)).toBe(false);
		},
	);
});
