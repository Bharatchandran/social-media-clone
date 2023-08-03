var express = require('express');
var router = express.Router();
const messagesController = require('../controllers/messages')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/',ensureLoggedIn, messagesController.index); // index page of message
router.get('/find', ensureLoggedIn,messagesController.find); // finding the if there is a message group between users
router.get('/:id', ensureLoggedIn, messagesController.message); // going to personal messaging
router.post('/:id', ensureLoggedIn, messagesController.create); // creating message group || creating message
module.exports = router;