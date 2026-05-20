const express = require('express');
const {
  postUserHandler,
  getUserByIdHandler,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/users', postUserHandler);
router.get('/users/:id', getUserByIdHandler);

module.exports = router;