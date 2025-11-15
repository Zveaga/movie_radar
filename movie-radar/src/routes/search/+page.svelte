<script lang='ts'>
	import MovieCard from "$lib/MovieCard.svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";


	let searchResults: any[] = [];
	let query = '';
	let loading = true;

	$: sortedResults = searchResults.sort((a, b) => {
		const aHasStreaming = a.streamingOptions?.nl?.length > 0;
		const bHasStreaming = b.streamingOptions?.nl?.length > 0;
		
		if (aHasStreaming && !bHasStreaming) return -1;
		if (!aHasStreaming && bHasStreaming) return 1;
		return 0;
	});

	$: query = $page.url.searchParams.get('q') ?? '';

	$: if (browser && query) {
        fetchResults(query);
    } else if (browser && !query) {
        searchResults = [];
		loading = false;
    }

    async function fetchResults(q: string) {
		loading = true;
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        searchResults = await res.json();
        console.log('Results:', searchResults);
		loading = false;
    }
</script>


<h1>Search Results for "{query}"</h1>

{#if loading}
	<p>Loading...</p>
{:else if sortedResults.length}
	{#each sortedResults as movie}
		<MovieCard {movie} />
	{/each}
{:else if query}
	<p>No results found.</p>
{/if}