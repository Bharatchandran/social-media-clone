var express = require('express');
var router = express.Router();
const newsController = require('../controllers/news')
const ensureLoggedIn = require('../config/ensuredLoggedIn');

router.get('/',ensureLoggedIn, newsController.news) //to display news in tweets page

module.exports = router;