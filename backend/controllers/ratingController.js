const ratingModel = require('../models/ratingModel');

async function rateMovie(req, res, next) {
  try {
    const movie_id = req.params.id;
    const user_id = req.user.user_id;
    const { rating_value } = req.body;
    const rv = parseInt(rating_value, 10);
    if (!rv || rv < 1 || rv > 5) return res.status(400).json({ message: 'Rating 1-5 required' });
    await ratingModel.upsertRating(user_id, movie_id, rv);
    res.json({ message: 'Rated' });
  } catch (err) { next(err); }
}

async function getAvgRating(req, res, next) {
  try {
    const movie_id = req.params.id;
    const avg = await ratingModel.getAverageRating(movie_id);
    res.json({ avg_rating: avg || 0 });
  } catch (err) { next(err); }
}

async function deleteRating(req, res, next) {
  try {
    const movie_id = req.params.id;
    const user_id = req.user.user_id;
    await ratingModel.deleteRating(user_id, movie_id);
    res.json({ message: 'Rating removed' });
  } catch (err) { next(err); }
}

module.exports = { rateMovie, getAvgRating, deleteRating };
