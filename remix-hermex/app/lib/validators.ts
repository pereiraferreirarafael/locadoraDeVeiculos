export function isValidId(id: unknown): id is number | string {
	if (typeof id === 'number') {
		return id > 0;
	}
	if (typeof id === 'string') {
		return id.trim().length > 0;
	}
	return false;
}

export function isValidPrice(price: unknown): price is number {
	return typeof price === 'number' && price > 0;
}

export function isValidImageUrl(url: unknown): url is string {
	if (typeof url !== 'string') return false;

	try {
		new URL(url);
		return true;
	} catch {
		return url.startsWith('/') || url.startsWith('./');
	}
}

export function sanitizeString(input: string): string {
	return input
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;')
		.replace(/\//g, '&#x2F;');
}

export function isValidYear(year: unknown): year is number {
	if (typeof year !== 'number') return false;

	const currentYear = new Date().getFullYear();
	return year >= 1900 && year <= currentYear;
}
