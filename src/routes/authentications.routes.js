const express = require('express');
const authMiddleware = require('../middleware/auth');

const {
  postAuthenticationHandler,
  putAuthenticationHandler,
  deleteAuthenticationHandler,
} = require('../controllers/authentications.controller');

const router = express.Router();

router.post('/authentications', postAuthenticationHandler);
router.put('/authentications', putAuthenticationHandler);
router.delete('/authentications', authMiddleware, deleteAuthenticationHandler);

module.exports = router;