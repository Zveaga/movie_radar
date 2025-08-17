import { RAPIDAPI_KEY } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': RAPIDAPI_KEY,
			'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
		}
	};
	
	if (!query) {
		return new Response(JSON.stringify({ error: 'Missing querry'}), {status: 400 });
	}

    const apiUrl = `https://streaming-availability.p.rapidapi.com/shows/search/title?title=${encodeURIComponent(query)}&country=NL&series_granularity=show&output_language=en`;
	
	const res = await fetch(apiUrl, options);
	const data = await res.json();
	// const data = await res.text();
	// console.log('API Response:', data);

	return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
	});
};