var express = require('express');
var router = express.Router();
const messagesController = require('../controllers/messages')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/:id', ensureLoggedIn, messagesController.message)
router.post('/:id', ensureLoggedIn, messagesController.create)
module.exports = router;