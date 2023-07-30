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
    res.render('profiles/index', {
        tweets,
        profile,
        title: "My Profile"
    })
}

async function show (req, res) {
    let currentUserId = req.user._id
    let userId = req.params.id
    const profile = await User.findOne({_id: userId})
    console.log(profile.avatar)
    currentUserId = currentUserId.toString();
    const tweets = await Tweet.find({user: userId}).sort({createdAt: -1})
    
    console.log(profile,"==")
    res.render('profiles/show', {
        tweets,
        userId,
        currentUserId,
        profile,
        title: "Profile"
    })
}

