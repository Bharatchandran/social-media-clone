const User = require('../models/user')

module.exports = {
    message,
    create
}

async function message(req, res) {
    console.log("test")
    let userId = req.params.id;
    let currentUser = req.user._id;
    console.log(userId,"---",currentUser)

    res.render('messages/index',{
        userId
    })
}

async function create(req, res) {
    const userId = req.params.id
    console.log("userId = ",userId)
    // console.log("current userId = ",req.user._id)
}