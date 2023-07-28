var express = require('express');
var router = express.Router();
const profilesController = require('../controllers/profiles')
const ensureLoggedIn = require('../config/ensuredLoggedIn');
/* GET users listing. */
// router.get('/',function(req,res){
//   res.render('tweets/index')
// })
router.get('/', ensureLoggedIn, profilesController.index)
router.get('/:id', ensureLoggedIn, profilesController.show)

// router.post('/', tweetsController.create)
module.exports = router;
