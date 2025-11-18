const movieModel = require('../models/movieModel');

async function listMovies(req, res, next) {
  try {
    const movies = await movieModel.getAllMovies();
    res.json(movies);
  } catch (err) { next(err); }
}

async function getMovie(req, res, next) {
  try {
    const id = req.params.id;
    const movie = await movieModel.getMovieById(id);
    if (!movie) return res.status(404).json({ message: 'Not found' });
    res.json(movie);
  } catch (err) { next(err); }
}

async function createMovie(req, res, next) {
  try {
    const { title, description, release_year, genre_id } = req.body;

    // Validation
    if (!title || !description || !release_year) {
      return res.status(400).json({ message: 'Missing required fields: title, description, release_year' });
    }

    const payload = { title, description, release_year, genre_id };
    const result = await movieModel.createMovie(payload);
    res.status(201).json({ message: 'Created', id: result.insertId });
  } catch (err) { next(err); }
}

async function updateMovie(req, res, next) {
  try {
    const id = req.params.id;
    const { title, description, release_year, genre_id } = req.body;

    // Validation
    if (!title || !description || !release_year) {
      return res.status(400).json({ message: 'Missing required fields: title, description, release_year' });
    }

    await movieModel.updateMovie(id, { title, description, release_year, genre_id });
    res.json({ message: 'Updated' });
  } catch (err) { next(err); }
}

async function deleteMovie(req, res, next) {
  try {
    const id = req.params.id;
    await movieModel.deleteMovie(id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}

module.exports = { listMovies, getMovie, createMovie, updateMovie, deleteMovie };
