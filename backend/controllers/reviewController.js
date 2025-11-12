const reviewModel = require('../models/reviewModel');

async function getReviews(req, res, next) {
  try {
    const movie_id = req.params.id;
    const reviews = await reviewModel.getReviewsByMovie(movie_id);
    res.json(reviews);
  } catch (err) { next(err); }
}

async function addReview(req, res, next) {
  try {
    const movie_id = req.params.id;
    const user_id = req.user.user_id;
    const { review_text } = req.body;
    if (!review_text) return res.status(400).json({ message: 'Review text required' });
    await reviewModel.createReview(user_id, movie_id, review_text);
    res.status(201).json({ message: 'Review added' });
  } catch (err) { next(err); }
}

async function editReview(req, res, next) {
  try {
    const review_id = req.params.id;
    const user_id = req.user.user_id;
    const { review_text } = req.body;
    await reviewModel.updateReview(review_id, user_id, review_text);
    res.json({ message: 'Updated' });
  } catch (err) { next(err); }
}

async function deleteReview(req, res, next) {
  try {
    const review_id = req.params.id;
    const user_id = req.user.user_id;
    await reviewModel.deleteReview(review_id, user_id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}

async function adminDeleteReview(req, res, next) {
  try {
    const review_id = req.params.id;
    await reviewModel.deleteReviewAsAdmin(review_id);
    res.json({ message: 'Deleted by admin' });
  } catch (err) { next(err); }
}

module.exports = { getReviews, addReview, editReview, deleteReview, adminDeleteReview };
