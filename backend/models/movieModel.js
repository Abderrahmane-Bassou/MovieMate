const db = require('../db');

async function getAllMovies() {
  const [rows] = await db.query(`
    SELECT m.*, g.genre_name,
      (SELECT AVG(rating_value) FROM Ratings r WHERE r.movie_id = m.movie_id) AS avg_rating
    FROM Movies m
    LEFT JOIN Genres g ON m.genre_id = g.genre_id
    ORDER BY m.title;
  `);
  return rows;
}

async function getMovieById(id) {
  const [rows] = await db.query(`
    SELECT m.*, g.genre_name,
      (SELECT AVG(rating_value) FROM Ratings r WHERE r.movie_id = m.movie_id) AS avg_rating
    FROM Movies m
    LEFT JOIN Genres g ON m.genre_id = g.genre_id
    WHERE m.movie_id = ?
  `, [id]);
  return rows[0];
}

async function createMovie({title, description, release_year, genre_id}) {
  const [res] = await db.query('INSERT INTO Movies (title, description, release_year, genre_id) VALUES (?, ?, ?, ?)', [title, description, release_year, genre_id]);
  return res;
}

async function updateMovie(id, {title, description, release_year, genre_id}) {
  const [res] = await db.query('UPDATE Movies SET title=?, description=?, release_year=?, genre_id=? WHERE movie_id=?', [title, description, release_year, genre_id, id]);
  return res;
}

async function deleteMovie(id) {
  const [res] = await db.query('DELETE FROM Movies WHERE movie_id = ?', [id]);
  return res;
}

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
