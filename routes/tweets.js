var express = require('express');
var router = express.Router();
const tweetsController = require('../controllers/tweets')
const ensureLoggedIn = require('../config/ensuredLoggedIn');
/* GET users listing. */
// router.get('/',function(req,res){
//   res.render('tweets/index')
// })
router.get('/',ensureLoggedIn, tweetsController.index)
router.get('/:id', ensureLoggedIn, tweetsController.show)
router.post('/', ensureLoggedIn, tweetsController.create)
module.exports = router;
