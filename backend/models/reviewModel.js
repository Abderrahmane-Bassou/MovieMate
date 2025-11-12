const db = require('../db');

async function getReviewsByMovie(movie_id) {
  const [rows] = await db.query(`
    SELECT r.*, u.username
    FROM Reviews r
    JOIN Users u ON r.user_id = u.user_id
    WHERE r.movie_id = ?
    ORDER BY r.created_at DESC
  `, [movie_id]);
  return rows;
}

async function createReview(user_id, movie_id, review_text) {
  const [res] = await db.query('INSERT INTO Reviews (user_id, movie_id, review_text) VALUES (?, ?, ?)', [user_id, movie_id, review_text]);
  return res;
}

async function updateReview(review_id, user_id, review_text) {
  const [res] = await db.query('UPDATE Reviews SET review_text=? WHERE review_id=? AND user_id=?', [review_text, review_id, user_id]);
  return res;
}

async function deleteReview(review_id, user_id) {
  const [res] = await db.query('DELETE FROM Reviews WHERE review_id=? AND user_id=?', [review_id, user_id]);
  return res;
}

async function deleteReviewAsAdmin(review_id) {
  const [res] = await db.query('DELETE FROM Reviews WHERE review_id=?', [review_id]);
  return res;
}

module.exports = { getReviewsByMovie, createReview, updateReview, deleteReview, deleteReviewAsAdmin };
