import db from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';

interface MovieListConfig {
	table: 'watched_movies' | 'favorite_movies';
	timestampField: 'watched_at' | 'favorited_at';
}

export function createMovieListHandler(config: MovieListConfig) {
	const { table, timestampField } = config;

	return {
		GET: (async () => {
			try {
				const movies = db.prepare(`SELECT * FROM ${table} ORDER BY ${timestampField} DESC`).all();
				return new Response(JSON.stringify(movies), {
					headers: { 'Content-Type': 'application/json' }
				});
			} catch (error) {
				console.error(`Error fetching ${table}:`, error);
				return new Response(JSON.stringify({ error: `Failed to fetch ${table}` }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		}) as RequestHandler,

		POST: (async ({ request }) => {
			try {
				const body = await request.json();
				const { imdb_id, title, poster_url } = body;

				if (!imdb_id || !title) {
					return new Response(JSON.stringify({ error: 'Missing required fields' }), {
						status: 400,
						headers: { 'Content-Type': 'application/json' }
					});
				}

				// Check if movie already exists
				const existing = db.prepare(`SELECT id FROM ${table} WHERE imdb_id = ?`).get(imdb_id);

				if (existing) {
					// Update timestamp
					db.prepare(`UPDATE ${table} SET ${timestampField} = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE imdb_id = ?`).run(imdb_id);
					return new Response(JSON.stringify({ id: existing.id, action: 'updated' }), {
						headers: { 'Content-Type': 'application/json' }
					});
				}

				// Insert new movie
				const result = db.prepare(`
					INSERT INTO ${table} (imdb_id, title, poster_url)
					VALUES (?, ?, ?)
				`).run(imdb_id, title, poster_url);

				return new Response(JSON.stringify({ id: result.lastInsertRowid, action: 'created' }), {
					status: 201,
					headers: { 'Content-Type': 'application/json' }
				});
			} catch (error) {
				console.error(`Error adding to ${table}:`, error);
				return new Response(JSON.stringify({ error: `Failed to add movie to ${table}` }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		}) as RequestHandler,

		DELETE: (async ({ request }) => {
			try {
				const body = await request.json();
				const { imdb_id } = body;

				if (!imdb_id) {
					return new Response(JSON.stringify({ error: 'Missing imdb_id' }), {
						status: 400,
						headers: { 'Content-Type': 'application/json' }
					});
				}

				db.prepare(`DELETE FROM ${table} WHERE imdb_id = ?`).run(imdb_id);

				return new Response(JSON.stringify({ action: 'deleted' }), {
					headers: { 'Content-Type': 'application/json' }
				});
			} catch (error) {
				console.error(`Error removing from ${table}:`, error);
				return new Response(JSON.stringify({ error: `Failed to remove movie from ${table}` }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		}) as RequestHandler
	};
}
