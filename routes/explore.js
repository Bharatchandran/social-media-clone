var express = require('express');
var router = express.Router();
const exploreController = require('../controllers/explore')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/',ensureLoggedIn, exploreController.index)
router.get('/find', ensureLoggedIn, exploreController.find)

module.exports = router;
