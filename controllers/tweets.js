const Tweet = require('../models/tweet')

module.exports = {
    index,
    create,
    show
}

async function index(req, res) {
    const tweets = await Tweet.find({}).sort({updatedAt: -1})
    const avatar = req.user.avatar;
  

    res.render('tweets/index', {
        tweets,
        avatar
    })
}

async function create(req,res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  const tweet =  await Tweet.create(req.body)
  res.redirect('/tweets');
}

async function show (req, res) {
    const tweet = await Tweet.findById(req.params.id);
    let reply = await tweet.reply;
    reply = reply.sort((a,b) => b.createdAt - a.createdAt)
    const tweetId = req.params.id
    const avatar = req.user.avatar;
    res.render('tweets/show',{
        tweet,
        avatar,
        tweetId,
        reply
    })
}