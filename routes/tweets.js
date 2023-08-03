var express = require('express');
var router = express.Router();
const tweetsController = require('../controllers/tweets')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/',ensureLoggedIn, tweetsController.index) // index page for tweets
router.get('/:id', ensureLoggedIn, tweetsController.show) // showing the replies to a specific tweet 
router.get('/:id/edit', ensureLoggedIn, tweetsController.edit) // editting the tweet
router.post('/', ensureLoggedIn, tweetsController.create) // creating the tweet 
router.post('/like/:id', ensureLoggedIn, tweetsController.like) // liking a tweet
router.delete('/delete/:id',ensureLoggedIn, tweetsController.delete) // deleting a tweet
router.put('/:id',tweetsController.update) // updating a tweet
module.exports = router;