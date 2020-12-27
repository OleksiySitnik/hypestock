const express = require('express');

const controllers = require('./controllers');

const router = express.Router();

router.post('/users/signUp', controllers.users.signUp);
router.post('/users/signIn', controllers.users.signIn);

module.exports = router;
