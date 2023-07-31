const Tweet = require('../models/tweet')
const User = require('../models/user')
module.exports = {
    index,
    show,
}

async function index (req, res) {
    let currentUserId = req.user._id
    const tweets = await Tweet.find({user: currentUserId}).sort({createdAt: -1})
    const profile = await User.findOne({_id: req.user._id})
    const deleteHref = "/tweets"
    const view = "index"
    const redirect = '/profiles'
    editPath ="tweet"
    
    res.render('profiles/index', {
        tweets,
        profile,
        title: "My Profile",
        deleteHref,
        view,
        currentUserId,
        editPath
    })
}

async function show (req, res) {
    let currentUserId = req.user._id
    let userId = req.params.id
    const profile = await User.findOne({_id: userId})
    currentUserId = currentUserId.toString();
    const tweets = await Tweet.find({user: userId}).sort({createdAt: -1})
    const deleteHref = "/tweets"
    const view = "index"
    editPath ="tweet"


    res.render('profiles/show', {
        tweets,
        userId,
        currentUserId,
        profile,
        title: "Profile",
        deleteHref,
        view,
        editPath
    })
}

