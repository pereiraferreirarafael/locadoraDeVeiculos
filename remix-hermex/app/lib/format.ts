export function formatPrice(value: number): string {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
}

export function formatNumber(value: number): string {
	return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatDate(date: Date | string): string {
	const dateObj = typeof date === 'string' ? new Date(date) : date;

	return new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).format(dateObj);
}

export function formatYear(year: number): string {
	return year.toString();
}

export function formatTramission(transmission: string): string {
	return transmission.charAt(0).toUpperCase() + transmission.slice(1).toLowerCase();
}
