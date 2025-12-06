<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/watched">My Movies</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/recommendations">Recommendations</a></li>
    </ul>
</nav>

<style>
    nav {
        display: flex;
        justify-content: center;
        padding: 1.5rem 0;
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        border-bottom: 1px solid #e0e0e0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
    
    nav ul {
        list-style: none;
        padding: 0;
        display: flex;
        justify-content: center;
        gap: 3rem;
        margin: 0;
    }
    
    nav a {
        text-decoration: none;
        color: #333;
        font-weight: 600;
        font-size: 1rem;
        position: relative;
        transition: color 0.3s ease;
        padding-bottom: 0.5rem;
    }
    
    nav a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transition: width 0.3s ease;
    }
    
    nav a:hover {
        color: #667eea;
    }
    
    nav a:hover::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        nav ul {
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        
        nav a {
            font-size: 0.95rem;
        }
    }
</style>
