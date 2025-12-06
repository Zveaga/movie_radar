<script lang="ts">
    interface MovieData {
        title: string;
        imdbId?: string;
        imdb_id?: string;
        poster_url?: string;
        imageSet?: {
            verticalPoster?: {
                w480?: string;
                w360?: string;
            };
        };
        streamingOptions?: Record<string, any[]>;
    }

    export let movie: MovieData;
    export let isWatched: boolean = false;
    export let isFavorite: boolean = false;
    export let onWatchedToggle: ((isWatched: boolean) => void) | null = null;
    export let onFavoriteToggle: ((isFavorite: boolean) => void) | null = null;
    export let showWatchedButton: boolean = true;
    export let showFavoriteButton: boolean = true;

    let addingWatched = false;
    let addingFavorite = false;
    let error: string | null = null;

    // Extract imdb_id or generate one from title
    $: imdb_id = movie.imdbId || movie.imdb_id || `title_${movie.title?.replace(/\s+/g, '_')}`;
    $: posterUrl = movie.poster_url ?? movie.imageSet?.verticalPoster?.w480 ?? movie.imageSet?.verticalPoster?.w360 ?? '';

    async function toggleWatched() {
        if (!onWatchedToggle) return;
        
        addingWatched = true;
        error = null;

        try {
            if (isWatched) {
                // Remove from watched
                const res = await fetch('/api/movies/watched', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imdb_id })
                });
                if (!res.ok) throw new Error('Failed to remove from watched');
                onWatchedToggle(false);
            } else {
                // Add to watched
                const res = await fetch('/api/movies/watched', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imdb_id, title: movie.title, poster_url: posterUrl })
                });
                if (!res.ok) throw new Error('Failed to add to watched');
                onWatchedToggle(true);
            }
        } catch (err) {
            error = err instanceof Error ? err.message : 'An error occurred';
            console.error('Error toggling watched:', err);
        } finally {
            addingWatched = false;
        }
    }

    async function toggleFavorite() {
        if (!onFavoriteToggle) return;

        addingFavorite = true;
        error = null;

        try {
            if (isFavorite) {
                // Remove from favorites
                const res = await fetch('/api/movies/favorites', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imdb_id })
                });
                if (!res.ok) throw new Error('Failed to remove from favorites');
                onFavoriteToggle(false);
            } else {
                // Add to favorites
                const res = await fetch('/api/movies/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imdb_id, title: movie.title, poster_url: posterUrl })
                });
                if (!res.ok) throw new Error('Failed to add to favorites');
                onFavoriteToggle(true);
            }
        } catch (err) {
            error = err instanceof Error ? err.message : 'An error occurred';
            console.error('Error toggling favorite:', err);
        } finally {
            addingFavorite = false;
        }
    }
</script>

<div class="movie-card">
    <img
        class="poster"
		src={posterUrl}
    	alt={movie.title}
        loading="lazy"
    />
    <div class="info">
        <h2>{movie.title}</h2>
        
        {#if error}
            <div class="error-message">{error}</div>
        {/if}

        <div class="actions">
            {#if onWatchedToggle && showWatchedButton}
                <button
                    on:click={toggleWatched}
                    disabled={addingWatched}
                    class="action-btn watched-btn"
                    class:active={isWatched}
                    title={isWatched ? 'Remove from watched' : 'Add to watched'}
                >
                    {#if addingWatched}
                        <span class="spinner"></span>
                    {:else if isWatched}
                        <span class="icon">✓</span>
                        <span class="label">Watched</span>
                        <span class="remove-icon">✕</span>
                    {:else}
                        <span class="icon">👁</span>
                        <span class="label">Add to Watched</span>
                    {/if}
                </button>
            {/if}
            
            {#if onFavoriteToggle && showFavoriteButton}
                <button
                    on:click={toggleFavorite}
                    disabled={addingFavorite}
                    class="action-btn favorite-btn"
                    class:active={isFavorite}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {#if addingFavorite}
                        <span class="spinner"></span>
                    {:else if isFavorite}
                        <span class="icon">★</span>
                        <span class="label">Favorited</span>
                        <span class="remove-icon">✕</span>
                    {:else}
                        <span class="icon">☆</span>
                        <span class="label">Add to Favorites</span>
                    {/if}
                </button>
            {/if}
        </div>
        
        {#if movie.streamingOptions?.nl && movie.streamingOptions.nl.length > 0}
            <div class="streaming-options">
                <strong>Available on:</strong>
                <div class="services">
                    {#each movie.streamingOptions.nl as option}
                        <a href={option.link} target="_blank" rel="noopener noreferrer" class="service-link">
                            <div class="service-badge" style="border-color: {option.service.themeColorCode}">
                                <img 
                                    src={option.service.imageSet.lightThemeImage} 
                                    alt={option.service.name}
                                    class="service-logo"
                                />
                                <span class="service-type">{option.type}</span>
                                {#if option.price}
                                    <span class="service-price">{option.price.formatted}</span>
                                {/if}
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

<style>

.movie-card {
    display: flex;
    gap: 1.5rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    padding: 1.5rem;
    margin: 1rem 0;
    align-items: flex-start;
    transition: box-shadow 0.2s;
}
.movie-card:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
}
.poster {
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    background: #eee;
}
.info {
    flex: 1;
}
h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
    color: #0070f3;
    text-align: left;
}

.error-message {
    background: #fee;
    color: #c00;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    border-left: 3px solid #c00;
}

.actions {
    display: flex;
    gap: 0.75rem;
    margin: 1rem 0;
    flex-wrap: wrap;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
}

.action-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.action-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.action-btn.active {
    border-color: currentColor;
    background: rgba(0,0,0,0.05);
}

.watched-btn {
    color: #0070f3;
    border-color: #0070f3;
}

.watched-btn.active {
    background: #e7f2ff;
    border-color: #0070f3;
}

.favorite-btn {
    color: #f59e0b;
    border-color: #f59e0b;
}

.favorite-btn.active {
    background: #fffbf0;
    border-color: #f59e0b;
}

.action-btn .icon {
    font-size: 1.1rem;
}

.action-btn .remove-icon {
    margin-left: auto;
    font-size: 0.8rem;
    opacity: 0.6;
    transition: opacity 0.2s;
}

.action-btn:hover .remove-icon {
    opacity: 1;
}

.spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0,0,0,0.1);
    border-radius: 50%;
    border-top-color: currentColor;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.label {
    font-size: 0.9rem;
}

.streaming-options {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
    text-align: left;
}
.services {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
}
.service-link {
    text-decoration: none;
}
.service-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* gap: 0.05rem; */
    padding: 0.75rem;
    background: #f8f9fa;
    border: 2px solid #0070f3;
    border-radius: 8px;
    transition: all 0.2s;
    width: 60px;
    height: 40px;
}
.service-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    background: #f0f7ff;
}
.service-logo {
    height: 28px;
    width: 60px;
    object-fit: contain;
}
.service-type {
    font-size: 0.75rem;
    color: #666;
    text-transform: capitalize;
    text-align: center;
    width: 100%;
}
.service-price {
    font-size: 0.75rem;
    color: #0070f3;
    font-weight: 600;
    text-align: center;
    width: 100%;
}

</style>