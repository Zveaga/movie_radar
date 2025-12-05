<script>
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
		/* background: #667eea; */
		 
		background: #ffffff;
		/* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
		border-radius: 20px;
		margin-bottom: 3rem;
		/* box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3); */
	}

	h1 {
		font-size: 3.5rem;
		margin: 0 0 1rem 0;
		color: white;
		font-weight: 800;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}

	.subtitle {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.9);
		margin: 0 0 2.5rem 0;
		font-weight: 300;
	}

	.search-form {
		max-width: 700px;
		margin: 0 auto;
	}

	.search-container {
		display: flex;
		gap: 0.75rem;
		background: white;
		padding: 0.5rem;
		border-radius: 50px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.search-container:focus-within {
		transform: translateY(-2px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
	}

	.search-input {
		flex: 1;
		padding: 0.85rem 1.5rem;
		border: none;
		border-radius: 50px;
		font-size: 1.1rem;
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

	.latest {
		padding: 2rem 0;
	}

	.latest h2 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		color: #333;
	}

	@media (max-width: 768px) {
		.hero {
			padding: 3rem 1.5rem;
		}

		h1 {
			font-size: 2.5rem;
		}

		.subtitle {
			font-size: 1rem;
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