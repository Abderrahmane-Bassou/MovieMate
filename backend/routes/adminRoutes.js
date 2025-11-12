const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

router.get('/users', authenticateToken, requireAdmin, adminController.listUsers);
router.delete('/users/:id', authenticateToken, requireAdmin, adminController.deleteUser);

router.get('/genres', authenticateToken, requireAdmin, adminController.listGenres);
router.post('/genres', authenticateToken, requireAdmin, adminController.addGenre);
router.delete('/genres/:id', authenticateToken, requireAdmin, adminController.deleteGenre);

module.exports = router;
