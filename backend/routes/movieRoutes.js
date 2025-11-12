const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', movieController.listMovies);
router.get('/:id', movieController.getMovie);
router.post('/', authenticateToken, requireAdmin, movieController.createMovie);
router.put('/:id', authenticateToken, requireAdmin, movieController.updateMovie);
router.delete('/:id', authenticateToken, requireAdmin, movieController.deleteMovie);

module.exports = router;
