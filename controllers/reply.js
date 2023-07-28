const Tweet = require('../models/tweet')

module.exports = {
    create
}

async function create (req, res) {
    const tweet = await Tweet.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    tweet.reply.push(req.body)
    
    await tweet.save();
    res.redirect(`/tweets/${tweet._id}`)
}