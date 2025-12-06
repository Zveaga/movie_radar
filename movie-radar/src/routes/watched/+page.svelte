<script lang="ts">
	import '$lib/styles/shared.css';
	import MovieCard from '$lib/MovieCard.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface Movie {
		id?: number;
		imdb_id: string;
		title: string;
		poster_url?: string;
		watched_at?: string;
		favorited_at?: string;
		created_at?: string;
	}

	let activeTab: 'watched' | 'favorites' = 'watched';
	let watchedMovies: Movie[] = [];
	let favoriteMovies: Movie[] = [];
	let loading = false;
	let error: string | null = null;

	onMount(() => {
		if (browser) {
			loadMovies();
		}
	});

	async function loadMovies() {
		loading = true;
		error = null;

		try {
			const [watchedRes, favoritesRes] = await Promise.all([
				fetch('/api/movies/watched'),
				fetch('/api/movies/favorites')
			]);

			if (!watchedRes.ok || !favoritesRes.ok) {
				throw new Error('Failed to load movies');
			}

			watchedMovies = await watchedRes.json();
			favoriteMovies = await favoritesRes.json();
			console.log('Watched movies:', watchedMovies);
			console.log('Favorite movies:', favoriteMovies);
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
			console.error('Error loading movies:', err);
		} finally {
			loading = false;
		}
	}

	function handleWatchedToggle(movieId: string) {
		return (isWatched: boolean) => {
			if (isWatched) {
				// Movie was added to watched
				loadMovies();
			} else {
				// Movie was removed from watched
				watchedMovies = watchedMovies.filter(m => m.imdb_id !== movieId);
			}
		};
	}

	function handleFavoriteToggle(movieId: string) {
		return (isFavorite: boolean) => {
			if (isFavorite) {
				// Movie was added to favorites
				loadMovies();
			} else {
				// Movie was removed from favorites
				favoriteMovies = favoriteMovies.filter(m => m.imdb_id !== movieId);
			}
		};
	}

	function isMovieWatched(movieId: string): boolean {
		return watchedMovies.some(m => m.imdb_id === movieId);
	}

	function isMovieFavorite(movieId: string): boolean {
		return favoriteMovies.some(m => m.imdb_id === movieId);
	}

	$: displayMovies = activeTab === 'watched' ? watchedMovies : favoriteMovies;
	$: displayLabel = activeTab === 'watched' ? 'Watched Movies' : 'Favorite Movies';
	$: displayCount = displayMovies.length;
</script>

<main>
	<div class="header">
		<h1>My Movies</h1>
		<div class="tabs">
			<button
				on:click={() => (activeTab = 'watched')}
				class="tab"
				class:active={activeTab === 'watched'}
			>
				<span class="icon">👁</span> Watched ({watchedMovies.length})
			</button>
			<button
				on:click={() => (activeTab = 'favorites')}
				class="tab"
				class:active={activeTab === 'favorites'}
			>
				<span class="icon">★</span> Favorites ({favoriteMovies.length})
			</button>
		</div>
	</div>

	{#if error}
		<div class="error-container">
			<p class="error">{error}</p>
			<button on:click={loadMovies} class="retry-btn">Retry</button>
		</div>
	{/if}

	{#if loading}
		<div class="loading-container">
			<div class="spinner"></div>
			<p>Loading your {activeTab} movies...</p>
		</div>
	{:else if displayCount === 0}
		<div class="empty-state">
			<div class="empty-icon">{activeTab === 'watched' ? '👁' : '★'}</div>
			<h2>No {displayLabel.toLowerCase()} yet</h2>
			<p>Start by searching for movies and adding them to your {activeTab} list!</p>
			<a href="/search" class="search-link">Search for Movies</a>
		</div>
	{:else}
		<div class="movies-container">
			<div class="movies-list">
				{#each displayMovies as movie (movie.imdb_id)}
					<MovieCard
						{movie}
						isWatched={isMovieWatched(movie.imdb_id)}
						isFavorite={isMovieFavorite(movie.imdb_id)}
						onWatchedToggle={handleWatchedToggle(movie.imdb_id)}
						onFavoriteToggle={handleFavoriteToggle(movie.imdb_id)}
						showWatchedButton={activeTab === 'watched'}
						showFavoriteButton={activeTab === 'favorites'}
					/>
				{/each}
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.header {
		margin-bottom: 2rem;
	}

	h1 {
		margin: 0 0 1.5rem 0;
		font-size: 2rem;
		color: #0070f3;
	}

	.tabs {
		display: flex;
		gap: 1rem;
		border-bottom: 2px solid #e0e0e0;
	}

	.tab {
		padding: 0.75rem 1.5rem;
		background: none;
		border: none;
		border-bottom: 3px solid transparent;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 500;
		color: #666;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.tab:hover {
		color: #0070f3;
	}

	.tab.active {
		color: #0070f3;
		border-bottom-color: #0070f3;
	}

	.tab .icon {
		font-size: 1.2rem;
	}

	.error-container {
		background: #fee;
		border: 1px solid #fcc;
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.error {
		color: #c00;
		margin: 0 0 1rem 0;
		font-weight: 500;
	}

	.retry-btn {
		padding: 0.6rem 1.5rem;
		background: #c00;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 500;
		transition: background 0.2s;
	}

	.retry-btn:hover {
		background: #a00;
	}

	.loading-container {
		text-align: center;
		padding: 3rem 1rem;
	}

	.spinner {
		display: inline-block;
		width: 40px;
		height: 40px;
		border: 4px solid rgba(0,0,0,0.1);
		border-radius: 50%;
		border-top-color: #0070f3;
		animation: spin 0.8s linear infinite;
		margin-bottom: 1rem;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.empty-state {
		text-align: center;
		padding: 3rem 1rem;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.empty-state h2 {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1.5rem;
	}

	.empty-state p {
		margin: 0 0 1.5rem 0;
		color: #666;
		font-size: 1.05rem;
	}

	.search-link {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: #0070f3;
		color: white;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 500;
		transition: all 0.2s;
	}

	.search-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0,112,243,0.3);
	}

	.movies-container {
		margin-top: 2rem;
	}

	.movies-list {
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

		.tabs {
			flex-wrap: wrap;
		}

		.tab {
			font-size: 0.9rem;
			padding: 0.6rem 1rem;
		}
	}
</style>
