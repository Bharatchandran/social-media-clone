var express = require('express');
var router = express.Router();
const profilesController = require('../controllers/profiles')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/', ensureLoggedIn, profilesController.index) //index page for current user profile
router.get('/:id', ensureLoggedIn, profilesController.show) // profile of other users

module.exports = router;
