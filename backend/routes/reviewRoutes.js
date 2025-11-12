const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

router.get('/movie/:id', reviewController.getReviews);
router.post('/movie/:id', authenticateToken, reviewController.addReview);
router.put('/:id', authenticateToken, reviewController.editReview);
router.delete('/:id', authenticateToken, reviewController.deleteReview);
router.delete('/admin/:id', authenticateToken, requireAdmin, reviewController.adminDeleteReview);

module.exports = router;
