const db = require('../db');

async function upsertRating(user_id, movie_id, rating_value) {
  const [rows] = await db.query('SELECT rating_id FROM Ratings WHERE user_id=? AND movie_id=?', [user_id, movie_id]);
  if (rows.length > 0) {
    const [res] = await db.query('UPDATE Ratings SET rating_value=?, rated_at=CURRENT_TIMESTAMP WHERE user_id=? AND movie_id=?', [rating_value, user_id, movie_id]);
    return res;
  } else {
    const [res] = await db.query('INSERT INTO Ratings (user_id, movie_id, rating_value) VALUES (?, ?, ?)', [user_id, movie_id, rating_value]);
    return res;
  }
}

async function getAverageRating(movie_id) {
  const [rows] = await db.query('SELECT AVG(rating_value) AS avg_rating FROM Ratings WHERE movie_id = ?', [movie_id]);
  return rows[0].avg_rating;
}

async function deleteRating(user_id, movie_id) {
  const [res] = await db.query('DELETE FROM Ratings WHERE user_id=? AND movie_id=?', [user_id, movie_id]);
  return res;
}

module.exports = { upsertRating, getAverageRating, deleteRating };
