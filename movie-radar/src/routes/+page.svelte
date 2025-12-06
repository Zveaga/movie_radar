<script>
	import '$lib/styles/shared.css';
	let searchQuery = '';
</script>

<main>
	<div class="hero">
		<!-- <h1>Movie Radar</h1> -->
		<!-- <p class="subtitle">Discover and track your favorite movies</p> -->
		
		<form method="GET" action="/search" class="search-form">
			<div class="search-container">
				<input
					type="text"
					name="q"
					placeholder="Search for any movie..."
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
	
	<!-- <section class="latest">
		<h2>Latest Releases</h2>
		<p>Coming soon...</p>
	</section> -->
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.hero {
		text-align: center;
		padding: 4rem 2rem;
		background: #ffffff;
		border-radius: 20px;
		margin-bottom: 3rem;
	}

	@media (max-width: 768px) {
		.hero {
			padding: 3rem 1.5rem;
		}
	}
</style>