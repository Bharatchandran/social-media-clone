const Tweet = require('../models/tweet')
const User = require('../models/user')
const Like = require('../models/like')

module.exports = {
    index,
    show,
}

async function index (req, res) {
    let currentUserId = req.user._id
    const tweets = await Tweet.find({user: currentUserId}).sort({createdAt: -1})
    const profile = await User.findOne({_id: req.user._id})
    const deleteHref = "/tweets" // in tweetContainer.ejs the delete path 
    const view = "index"  // the are two values for view in this project 
                          // "index" -> if its a tweet "reply" -> if its a reply
    editPath ="tweet"     // in tweetContainer.ejs the edit path 
    const like = await Like.find({})
    res.render('profiles/index', {
        title: "My Profile",
        tweets,
        profile,
        deleteHref,
        view,
        currentUserId,
        editPath,
        like
    })
}

async function show (req, res) {
    let currentUserId = req.user._id
    let userId = req.params.id
    const profile = await User.findOne({_id: userId})
    currentUserId = currentUserId.toString();
    const tweets = await Tweet.find({user: userId}).sort({createdAt: -1})
    const deleteHref = "/tweets" // in tweetContainer.ejs the delete path 
    const view = "index"
    editPath ="tweet" // in tweetContainer.ejs the edit path 
    const like = await Like.find({})
    res.render('profiles/show', {
        title: "Profile",
        tweets,
        userId,
        currentUserId,
        profile,
        deleteHref,
        view,
        editPath,
        like
    })
}

