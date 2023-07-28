var express = require('express');
var router = express.Router();
const replyController = require('../controllers/reply')
const ensureLoggedIn = require('../config/ensuredLoggedIn');
/* GET users listing. */
// router.get('/',function(req,res){
//   res.render('tweets/index')
// })
router.post('/reply/:id', ensureLoggedIn, replyController.create)

module.exports = router;
