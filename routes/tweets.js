var express = require('express');
var router = express.Router();
const tweetsController = require('../controllers/tweets')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/',ensureLoggedIn, tweetsController.index)
router.get('/:id', ensureLoggedIn, tweetsController.show)
router.get('/:id/edit', ensureLoggedIn, tweetsController.edit)
router.post('/', ensureLoggedIn, tweetsController.create)
router.post('/like/:id', ensureLoggedIn, tweetsController.like)
router.delete('/delete/:id',ensureLoggedIn, tweetsController.delete)
router.put('/:id',tweetsController.update)
module.exports = router;