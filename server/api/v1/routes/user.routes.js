const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('', userController.getAllUsersHandler);
router.post('', userController.createNewUserHandler);

module.exports = router;