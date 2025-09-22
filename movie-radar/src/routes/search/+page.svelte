<script lang='ts'>
	import MovieCard from "$lib/MovieCard.svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";


	let searchResults: any[] = [];
	let query = '';

	$: query = $page.url.searchParams.get('q') ?? '';

	// onMount(() => {
    //     if (query) {
    //         fetchResults(query);
    //     } else {
    //         searchResults = [];
    //     }
    // });

	$: if (browser && query) {
        fetchResults(query);
    } else if (browser && !query) {
        searchResults = [];
    }

    async function fetchResults(q: string) {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        searchResults = await res.json();
        console.log('Results:', searchResults);
    }
</script>


<h1>Search Results for "{query}""</h1>

{#if searchResults.length}
	{#each searchResults as movie}
		<MovieCard {movie} />
	{/each}
{:else}
	<p>No results found.</p>
{/if}