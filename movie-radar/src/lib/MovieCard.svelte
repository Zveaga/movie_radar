<script lang="ts">
    export let movie;
</script>

<div class="movie-card">
    <img
        class="poster"
		src={
		    movie.imageSet?.verticalPoster?.w480
		    ?? movie.imageSet?.verticalPoster?.w360
		    ?? ''
		}   
    	alt={movie.title}
        loading="lazy"
    />
    <div class="info">
        <h2>{movie.title}</h2>
        <span class="year">{movie.releaseYear}</span>
        <div class="genres">
            {#each movie.genres as genre}
                <span class="genre">{genre.name}</span>
            {/each}
        </div>
        <div>
            <strong>Directors:</strong> {movie.directors?.join(', ') ?? 'N/A'}
        </div>
        <div>
            <strong>Cast:</strong> {movie.cast.slice(0, 5).join(', ')}{movie.cast.length > 5 ? '...' : ''}
        </div>
        <div class="overview">{movie.overview}</div>
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
}
.year {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 0.5rem;
    display: block;
}
.genres {
    margin-bottom: 0.5rem;
}
.genre {
    background: #e0e7ff;
    color: #3730a3;
    border-radius: 6px;
    padding: 0.2rem 0.6rem;
    margin-right: 0.4rem;
    font-size: 0.85rem;
    display: inline-block;
}
.overview {
    color: #444;
    font-size: 1rem;
    margin-top: 0.5rem;
}

</style>