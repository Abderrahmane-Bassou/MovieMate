const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/movie/:id', authenticateToken, ratingController.rateMovie);
router.get('/movie/:id', ratingController.getAvgRating);
router.delete('/movie/:id', authenticateToken, ratingController.deleteRating);

module.exports = router;
