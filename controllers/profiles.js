const Tweet = require('../models/tweet')

module.exports = {
    index,
    show,
}

async function index (req, res) {
    let currentUserId = req.user._id
    const tweets = await Tweet.find({user: currentUserId}).sort({createdAt: -1})
    res.render('profiles/index', {
        tweets
    })
}

async function show (req, res) {
    let userId = req.params.id
    const tweets = await Tweet.find({user: userId}).sort({createdAt: -1})
    res.render('profiles/show', {
        tweets,
        userId
    })
}

