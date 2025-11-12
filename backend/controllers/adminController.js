const userModel = require('../models/userModel');
const genreModel = require('../models/genreModel');
const movieModel = require('../models/movieModel');

async function listUsers(req, res, next) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) { next(err); }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    await userModel.deleteUser(id);
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
}

async function listGenres(req, res, next) {
  try {
    const genres = await genreModel.getAllGenres();
    res.json(genres);
  } catch (err) { next(err); }
}

async function addGenre(req, res, next) {
  try {
    const { genre_name } = req.body;
    if (!genre_name) return res.status(400).json({ message: 'genre_name required' });
    await genreModel.createGenre(genre_name);
    res.status(201).json({ message: 'Genre added' });
  } catch (err) { next(err); }
}

async function deleteGenre(req, res, next) {
  try {
    const id = req.params.id;
    await genreModel.deleteGenre(id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}

module.exports = { listUsers, deleteUser, listGenres, addGenre, deleteGenre };
