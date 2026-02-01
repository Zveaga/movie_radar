# Movie Radar Quick Start Guide

## Running the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Features Overview

### 1. Search Movies
- Go to home page (`/`)
- Enter a movie title in the search box
- Browse search results with streaming options

### 2. Track Watched Movies
- Click "Add to Watched" button on any search result
- Button turns blue with checkmark (✓) when active
- Remove by clicking the "x" icon that appears
- View all watched movies at `/watched`

### 3. Favorite Movies
- Click "Add to Favorites" button on any search result  
- Button turns amber with star (★) when active
- Remove by clicking the "x" icon that appears
- View all favorites at `/favorites`

### 4. Collection Pages
- **`/watched`**: View watched movies with ability to toggle favorites
- **`/favorites`**: View favorite movies with ability to toggle watched
- Toggle between lists using the tab buttons
- Each tab shows count of movies

## Database

The application uses SQLite (better-sqlite3) to persist:
- Watched movies list
- Favorites list
- Timestamps for when movies were added

Database file: `./data/movies.db` (created automatically)

## Component Props

### MovieCard Component
```svelte
<MovieCard 
  movie={movieObject}
  isWatched={false}
  isFavorite={false}
  onWatchedToggle={(isWatched) => handleWatchedToggle()}
  onFavoriteToggle={(isFavorite) => handleFavoriteToggle()}
/>
```

## API Reference

### GET /api/movies/watched
Returns all watched movies

### POST /api/movies/watched
Add movie to watched list
```json
{
  "imdb_id": "unique_id",
  "title": "Movie Title",
  "poster_url": "https://..."
}
```

### DELETE /api/movies/watched
Remove movie from watched list
```json
{
  "imdb_id": "unique_id"
}
```

### GET /api/movies/favorites
Returns all favorite movies

### POST /api/movies/favorites
Add movie to favorites list
```json
{
  "imdb_id": "unique_id",
  "title": "Movie Title",
  "poster_url": "https://..."
}
```

### DELETE /api/movies/favorites
Remove movie from favorites list
```json
{
  "imdb_id": "unique_id"
}
```

## Styling

The application uses:
- Consistent card-based layout
- Blue (#0070f3) for watched state
- Amber (#f59e0b) for favorite state
- Responsive design for mobile and desktop
- Smooth transitions and hover effects

## Error Handling

- Network errors display inline error messages
- Database errors show user-friendly messages
- Retry buttons available when operations fail
- Console logs for debugging

## File Structure Quick Reference

```
src/
├── lib/
│   ├── MovieCard.svelte          ← Enhanced with buttons
│   ├── server/db.ts              ← Database setup
│   └── styles/shared.css
├── routes/
│   ├── api/movies/
│   │   ├── watched/+server.ts    ← Watch API
│   │   └── favorites/+server.ts  ← Favorite API
│   ├── search/+page.svelte       ← Search with state
│   ├── watched/+page.svelte      ← Watched collection
│   ├── favorites/+page.svelte    ← Favorites collection
│   └── ...
data/
└── movies.db                      ← SQLite database (created on first run)
```

## Troubleshooting

### Database file not created
- Make sure `data/` directory exists or will be created automatically
- Check file permissions

### Buttons not working
- Check browser console for errors
- Verify API endpoints are accessible
- Ensure database tables were created

### State not persisting
- Clear browser cache
- Check that `./data/movies.db` exists
- Verify database has read/write permissions

## Next Steps

You can enhance this further with:
- User authentication
- Movie ratings and reviews
- Recommendation engine
- Watch history/timeline
- Sharing lists with friends
- Advanced search filters
