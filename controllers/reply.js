const Tweet = require('../models/tweet')

module.exports = {
    create,
    delete: deleteReply,
    edit,
    update
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

async function deleteReply(req, res) {
    const tweet = await Tweet.findOne({'reply._id': req.params.id})
    const tweetId= tweet._id.toString();

    tweet.reply.remove(req.params.id)
    await tweet.save();
    res.redirect(`/tweets/${tweetId}`)

}

async function edit (req, res) {
    let tweet = await Tweet.findOne({'reply._id': req.params.id})
     tweet = await tweet.reply.find(el => el._id.toString() === req.params.id.toString())
    const tweetId= req.params.id.toString();
    const deleteHref = "/tweets"
    const currentUserId = req.user._id
    const view = "index"
    const avatar = req.user.avatar;
    const editPath = "reply"
   
    res.render('tweets/edit',{
        tweet,
        deleteHref,
        currentUserId,
        view,
        title: "Edit",
        avatar,
        editPath,
        tweetId,
    })
}

async function update(req, res) {
    let tweet = await Tweet.findOne({'reply._id':req.params.id})
    
    let reply = tweet.reply.find(el => el._id.toString() === req.params.id)
    
    
    reply.content = req.body.content
    await tweet.save();
    
    res.redirect(`/tweets/${tweet._id}`);
}
