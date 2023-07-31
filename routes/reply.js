var express = require('express');
var router = express.Router();
const replyController = require('../controllers/reply')
const ensureLoggedIn = require('../config/ensuredLoggedIn');
/* GET users listing. */
// router.get('/',function(req,res){
//   res.render('tweets/index')
// })
router.get('/reply/:id/edit', ensureLoggedIn, replyController.edit)
router.post('/reply/:id', ensureLoggedIn, replyController.create)
router.delete('/reply/delete/:id', ensureLoggedIn, replyController.delete)
router.put('/reply/:id',replyController.update)
module.exports = router;
