<script lang='ts'>
	import MovieCard from "$lib/MovieCard.svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";


	let searchResults: any[] = [];
	let query = '';
	let loading = true;
	let searchQuery = '';

	$: sortedResults = searchResults.sort((a, b) => {
		const aHasStreaming = a.streamingOptions?.nl?.length > 0;
		const bHasStreaming = b.streamingOptions?.nl?.length > 0;
		
		if (aHasStreaming && !bHasStreaming) return -1;
		if (!aHasStreaming && bHasStreaming) return 1;
		return 0;
	});

	$: query = $page.url.searchParams.get('q') ?? '';
	$: searchQuery = query;

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

    function handleSearch(e: Event) {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    }
</script>

<main>
	<div class="search-section">
		<!-- <h1>Search Movies</h1> -->
		<form on:submit={handleSearch} class="search-form">
			<div class="search-container">
				<input
					type="text"
					name="q"
					placeholder="Search for another movie..."
					bind:value={searchQuery}
					class="search-input"
				/>
				<button type="submit" class="search-button">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.35-4.35"></path>
					</svg>
					Search
				</button>
			</div>
		</form>
	</div>

	<section class="results">
		{#if query}
			<!-- <h2>Results for "{query}"</h2> -->
			{#if loading}
				<p class="loading">Loading...</p>
			{:else if sortedResults.length}
				<div class="results-grid">
					{#each sortedResults as movie}
						<MovieCard {movie} />
					{/each}
				</div>
			{:else}
				<p class="no-results">No results found.</p>
			{/if}
		{/if}
	</section>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.search-section {
		text-align: center;
		margin-bottom: 3rem;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		color: #333;
	}

	.search-form {
		max-width: 600px;
		margin: 0 auto;
	}

	.search-container {
		display: flex;
		gap: 0.75rem;
		background: white;
		padding: 0.5rem;
		border-radius: 50px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.search-container:focus-within {
		transform: translateY(-2px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
	}

	.search-input {
		flex: 1;
		padding: 0.85rem 1.5rem;
		border: none;
		border-radius: 50px;
		font-size: 1rem;
		background: transparent;
		color: #333;
	}

	.search-input:focus {
		outline: none;
	}

	.search-input::placeholder {
		color: #999;
	}

	.search-button {
		padding: 0.85rem 2rem;
		background: #667eea;
		/* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
		color: white;
		border: none;
		border-radius: 50px;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		white-space: nowrap;
	}

	.search-button:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
	}

	.search-button:active {
		transform: scale(0.98);
	}

	.results {
		padding-top: 2rem;
	}

	.results h2 {
		font-size: 1.5rem;
		margin-bottom: 2rem;
		color: #333;
	}

	.loading,
	.no-results {
		text-align: center;
		font-size: 1.1rem;
		color: #666;
		padding: 2rem;
	}

	.results-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		main {
			padding: 1rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.search-container {
			flex-direction: column;
			border-radius: 20px;
		}

		.search-input,
		.search-button {
			border-radius: 15px;
		}

		.search-button {
			justify-content: center;
		}
	}
</style>