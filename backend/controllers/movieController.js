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
    const payload = req.body;
    const result = await movieModel.createMovie(payload);
    res.status(201).json({ message: 'Created', id: result.insertId });
  } catch (err) { next(err); }
}

async function updateMovie(req, res, next) {
  try {
    const id = req.params.id;
    await movieModel.updateMovie(id, req.body);
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
