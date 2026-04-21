export function ok<T>(data: T): Response {
	return Response.json(data, { status: 200 });
}

export function created<T>(data: T): Response {
	return Response.json(data, { status: 201 });
}

export function badRequest(message: string = 'Requisição inválida'): Response {
	return new Response(message, { status: 400, statusText: 'Bad Request' });
}

export function serverError(message: string = 'Erro interno no servidor'): Response {
	return new Response(message, { status: 500, statusText: 'Internal Server Error' });
}

export function notFound(message: string = 'Recurso não encontrado'): Response {
	return new Response(message, { status: 404, statusText: 'Not Found' });
}
