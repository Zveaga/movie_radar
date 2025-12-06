import { createMovieListHandler } from '$lib/server/movieListHandler';

const handlers = createMovieListHandler({
	table: 'watched_movies',
	timestampField: 'watched_at'
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
