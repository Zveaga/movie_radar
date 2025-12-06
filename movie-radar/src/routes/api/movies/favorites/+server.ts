import { createMovieListHandler } from '$lib/server/movieListHandler';

const handlers = createMovieListHandler({
	table: 'favorite_movies',
	timestampField: 'favorited_at'
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
