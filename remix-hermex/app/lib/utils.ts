export function createSlug(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Remove acentos
		.replace(/[^\w\s-]/g, '') // Remove caracteres especiais
		.replace(/\s+/g, '-') // Substitui espaços por hífens
		.replace(/-+/g, '-') // Remove hífens duplicados
		.trim();
}

export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;

	return text.slice(0, maxLength).trim() + '...';
}

export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return function (...args: Parameters<T>) {
		const later = () => {
			timeout = null;
			func(...args);
		};

		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export function isServer(): boolean {
	return typeof window === 'undefined';
}
