<script lang='ts'>
	import MovieCard from "$lib/MovieCard.svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	let searchResults: any[] = [];
	let query = '';

	$: query = $page.url.searchParams.get('q') ?? '';

	onMount(async () => {
		if (query) {
			const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
			searchResults = await res.json();
			console.log('Results:', searchResults);
		}
	});
</script>


<h1>Search Results for "{query}""</h1>

{#if searchResults.length}
	{#each searchResults as movie}
		<MovieCard {movie} />
	{/each}
{:else}
	<p>No results found.</p>
{/if}