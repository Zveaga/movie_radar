// @ts-ignore - better-sqlite3 doesn't have type definitions
import Database from 'better-sqlite3';

// Create database in a persistent location
// better-sqlite3 will create the file, but we need to ensure the directory exists
// For development, the data directory should be created manually or by the build process
const dbPath = './data/movies.db';
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize tables
export function initializeDatabase() {
	// Watched movies table
	db.exec(`
		CREATE TABLE IF NOT EXISTS watched_movies (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			imdb_id TEXT NOT NULL UNIQUE,
			title TEXT NOT NULL,
			poster_url TEXT,
			watched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`);

	// Favorite movies table
	db.exec(`
		CREATE TABLE IF NOT EXISTS favorite_movies (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			imdb_id TEXT NOT NULL UNIQUE,
			title TEXT NOT NULL,
			poster_url TEXT,
			favorited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`);
}

// Initialize on module load
initializeDatabase();

export default db;
