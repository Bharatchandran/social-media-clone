var express = require('express');
var router = express.Router();
const profilesController = require('../controllers/profiles')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/', ensureLoggedIn, profilesController.index)
router.get('/:id', ensureLoggedIn, profilesController.show)

module.exports = router;
