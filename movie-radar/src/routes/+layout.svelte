<script>
	import '$lib/app.css';

	let searchQuery = '';

	const handleSearch = (event) => {
		console.log('Searching for:', searchQuery);
	}
</script>

<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/recommendations">Recommendations</a></li>
        <li><a href="/history">Watched Movies</a></li>
    </ul>
	<form on:submit|preventDefault={handleSearch}>
		<input
			type="text"
			placeholder="Search movie"
			bind:value={searchQuery}
		/>
		<button type="submit">Search</button>
	</form>
</nav>

<slot />

<style>
    nav {
        display: flex;
        align-items: center;
        padding: 1rem 0;
    }
    nav ul {
        list-style: none;
        padding: 0;
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin: 0;
    }
    nav a {
        text-decoration: none;
        color: #0070f3;
        font-weight: bold;
    }
    nav a:hover {
        text-decoration: underline;
    }
    nav form {
        margin-left: auto;
        display: flex;
        gap: 0.5rem;
    }
</style>