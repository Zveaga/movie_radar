import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');

	if (!query) {
		return new Response(JSON.stringify({ error: 'Missing querry'}), {status: 400 });
	}

    const apiUrl = `https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${encodeURIComponent(query)}`;
	const res = await fetch(apiUrl);
	const data = await res.json();

	return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
	});
};