const express = require('express');
const authMiddleware = require('../middleware/auth');

const {
  getProfileHandler,
  getProfileApplicationsHandler,
  getProfileBookmarksHandler,
} = require('../controllers/profile.controller');

const router = express.Router();

router.get('/profile', authMiddleware, getProfileHandler);
router.get('/profile/applications', authMiddleware, getProfileApplicationsHandler);
router.get('/profile/bookmarks', authMiddleware, getProfileBookmarksHandler);

module.exports = router;