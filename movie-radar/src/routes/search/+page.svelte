<script lang='ts'>
	import '$lib/styles/shared.css';
	import MovieCard from "$lib/MovieCard.svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	interface Movie {
		imdbId?: string;
		imdb_id?: string;
		title: string;
		streamingOptions?: Record<string, any[]>;
		imageSet?: { verticalPoster?: { w480?: string; w360?: string } };
	}

	let searchResults: Movie[] = [];
	let watchedMovies: Set<string> = new Set();
	let favoriteMovies: Set<string> = new Set();
	let query = '';
	let loading = true;
	let searchQuery = '';

	$: sortedResults = searchResults.sort((a, b) => {
		const aHasStreaming = (a.streamingOptions?.nl?.length ?? 0) > 0;
		const bHasStreaming = (b.streamingOptions?.nl?.length ?? 0) > 0;
		
		if (aHasStreaming && !bHasStreaming) return -1;
		if (!aHasStreaming && bHasStreaming) return 1;
		return 0;
	});

	$: query = $page.url.searchParams.get('q') ?? '';
	$: searchQuery = query;

	$: if (browser && query) {
        fetchResults(query);
        loadMovieLists();
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

	async function loadMovieLists() {
		try {
			const [watchedRes, favoritesRes] = await Promise.all([
				fetch('/api/movies/watched'),
				fetch('/api/movies/favorites')
			]);

			if (watchedRes.ok) {
				const watched = await watchedRes.json();
				watchedMovies = new Set(watched.map((m: any) => m.imdb_id));
			}

			if (favoritesRes.ok) {
				const favorites = await favoritesRes.json();
				favoriteMovies = new Set(favorites.map((m: any) => m.imdb_id));
			}
		} catch (error) {
			console.error('Error loading movie lists:', error);
		}
	}

	function getMovieId(movie: Movie): string {
		return movie.imdbId || movie.imdb_id || `title_${movie.title?.replace(/\s+/g, '_')}`;
	}

	function handleWatchedToggle(movieId: string) {
		return (isWatched: boolean) => {
			if (isWatched) {
				watchedMovies.add(movieId);
			} else {
				watchedMovies.delete(movieId);
			}
			watchedMovies = watchedMovies; // Trigger reactivity
		};
	}

	function handleFavoriteToggle(movieId: string) {
		return (isFavorite: boolean) => {
			if (isFavorite) {
				favoriteMovies.add(movieId);
			} else {
				favoriteMovies.delete(movieId);
			}
			favoriteMovies = favoriteMovies; // Trigger reactivity
		};
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
					{#each sortedResults as movie (getMovieId(movie))}
						{@const movieId = getMovieId(movie)}
						<MovieCard 
							{movie}
							isWatched={watchedMovies.has(movieId)}
							isFavorite={favoriteMovies.has(movieId)}
							onWatchedToggle={handleWatchedToggle(movieId)}
							onFavoriteToggle={handleFavoriteToggle(movieId)}
						/>
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

	.results {
		padding-top: 2rem;
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
	}
</style>