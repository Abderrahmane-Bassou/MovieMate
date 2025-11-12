const db = require('../db');

async function getAllGenres() {
  const [rows] = await db.query('SELECT * FROM Genres ORDER BY genre_name');
  return rows;
}

async function createGenre(name) {
  const [res] = await db.query('INSERT INTO Genres (genre_name) VALUES (?)', [name]);
  return res;
}

async function deleteGenre(id) {
  const [res] = await db.query('DELETE FROM Genres WHERE genre_id = ?', [id]);
  return res;
}

module.exports = { getAllGenres, createGenre, deleteGenre };
