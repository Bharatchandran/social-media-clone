var express = require('express');
var router = express.Router();
const exploreController = require('../controllers/explore')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/',ensureLoggedIn, exploreController.index) // index page of search
router.get('/find', ensureLoggedIn, exploreController.find) // finding the person User

module.exports = router;
