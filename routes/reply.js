var express = require('express');
var router = express.Router();
const replyController = require('../controllers/reply')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/reply/:id/edit', ensureLoggedIn, replyController.edit) // edit screen for reply
router.post('/reply/:id', ensureLoggedIn, replyController.create) // creating the reply for tweet 
router.delete('/reply/delete/:id', ensureLoggedIn, replyController.delete) // deleting the reply
router.put('/reply/:id',replyController.update) // updating the edited tweet
module.exports = router;
