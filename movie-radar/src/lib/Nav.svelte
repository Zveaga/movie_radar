<script>
	let searchQuery = '';
</script>

<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/recommendations">Recommendations</a></li>
        <li><a href="/history">Watched Movies</a></li>
    </ul>

	<form method="GET" action="/search">
        <input
            type="text"
            name="q"
            placeholder="Search movie"
            bind:value={searchQuery}
        />
        <button type="submit">Search</button>
    </form>
</nav>

<style>
    nav {
        display: flex;
        align-items: center;
        padding: 1rem 0;
		max-width: 900px;
	    margin: 0 auto;
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
	nav form input[type="text"] {
   		width: 250px;
        padding: 0.4rem 0.5rem;
        border: 2px solid #ddd;
        border-radius: 6px;
        font-size: 0.95rem;
        transition: border-color 0.2s;
	}
    nav form input[type="text"]:focus {
        outline: none;
        border-color: #0070f3;
    }
    nav form button {
        padding: 0.4rem 1rem;
        background: #0070f3;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.2s;
    }
    nav form button:hover {
        background: #0051cc;
    }
</style>
