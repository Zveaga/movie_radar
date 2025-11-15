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
        <!-- <span class="year">{movie.releaseYear}</span> -->
        <!-- <div class="genres">
            {#each movie.genres as genre}
                <span class="genre">{genre.name}</span>
            {/each}
        </div> -->
        <!-- <div>
            <strong>Directors:</strong> {movie.directors?.join(', ') ?? 'N/A'}
        </div>
        <div>
            <strong>Cast:</strong> {movie.cast.slice(0, 5).join(', ')}{movie.cast.length > 5 ? '...' : ''}
        </div> -->
        <!-- <div class="overview">{movie.overview}</div> -->
        
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
.streaming-options {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
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