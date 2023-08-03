var express = require('express');
var router = express.Router();
const messagesController = require('../controllers/messages')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/',ensureLoggedIn, messagesController.index);
router.get('/find', ensureLoggedIn,messagesController.find);
router.get('/:id', ensureLoggedIn, messagesController.message);
// router.post('/message/:id', ensureLoggedIn, messagesController.createMessage);
router.post('/:id', ensureLoggedIn, messagesController.create);
module.exports = router;