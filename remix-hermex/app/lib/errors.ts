export class AppError extends Error {
	constructor(
		message: string,
		public statusCode: number = 500,
		public statusText: string = 'Internal Server Error'
	) {
		super(message);
		this.name = 'AppError';
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string) {
		super(`${resource} não encontrado`, 404, 'Not Found');
		this.name = 'NotFoundError';
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, 400, 'Validation Error');
		this.name = 'ValidationError';
	}
}

export class ServiceError extends AppError {
	constructor(service: string, originalError?: unknown) {
		const message = `Erro ao comunicar com o serviço ${service}`;
		super(message, 502, 'Bad Gateway');
		this.name = 'ServiceError';

		if (originalError instanceof Error) {
			this.message += `: ${originalError.message}`;
			this.stack = originalError.stack;
		}
	}
}

export function createErrorResponse(
	error: AppError | Error,
	fallbackStatus: number = 500
): Response {
	if (error instanceof AppError) {
		return new Response(error.message, {
			status: error.statusCode,
			statusText: error.statusText,
		});
	}

	return new Response(error.message || 'Erro interno no servidor', {
		status: fallbackStatus,
		statusText: 'Internal Server Error',
	});
}

export function isAppError(error: unknown): error is AppError {
	return error instanceof AppError;
}
