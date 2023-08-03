const Tweet = require('../models/tweet')
const fetch = require('node-fetch')
const User = require('../models/user')
const Like = require('../models/like')
const token = process.env.NEWS_API;
module.exports = {
    index,
    create,
    show,
    delete: deleteTweet,
    update,
    edit,
    like
}


async function index(req, res) {
    const tweets = await Tweet.find({}).sort({createdAt: -1})
    const users = await User.find({name: req.query.name})
    const like = await Like.find({})
    const avatar = req.user.avatar;
    const view = "index"
    const deleteHref = "/tweets"
    const currentUserId = req.user._id
    const editPath = "tweets"
    const formPath = "/tweets"
    let getNews = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${token}`)
    .then(res=> res.json())
.then()
getNews = getNews.articles

    res.render('tweets/index', {
        tweets,
        avatar,
        title: "Home",
        view,
        deleteHref,
        currentUserId,
        getNews,
        editPath,
        formPath,
        users,
        like
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
    const like = await Like.find({})
    let reply = await tweet.reply;
    reply = reply.sort((a,b) => b.createdAt - a.createdAt)
    const tweets = reply
    const tweetId = req.params.id
    const avatar = req.user.avatar;
    const tweeterId = tweet.user
    const currentUserId = req.user._id
    const view = "reply"
    const deleteHref = "/reply"
    const editPath = "reply"

    res.render('tweets/show',{
        tweet,
        avatar,
        tweetId,
        tweets,
        title: "Replies",
        view,
        deleteHref,
        currentUserId,
        tweeterId,
        editPath,
        like
        
    })
}

async function deleteTweet(req, res) {
    const tweet = await Tweet.findById({_id: req.params.id});
    await tweet.deleteOne({_id: req.params.id})
    res.redirect('/tweets')
}

async function edit (req, res) {
    const deleteHref = "/tweets"
    const currentUserId = req.user._id
    const view = "index"
    const avatar = req.user.avatar;
    const tweet = await Tweet.findOne({_id: req.params.id})
    console.log(tweet)
    const tweetId= req.params.id.toString();
    const editPath = "tweets"
    const tweetContent = tweet.content
    res.render('tweets/edit',{
        title: "Edit",
        tweet,
        deleteHref,
        currentUserId,
        view,
        avatar,
        editPath,
        tweetId,
        tweetContent
    })
}

async function update(req, res) {
    await Tweet.findByIdAndUpdate(req.params.id,req.body)
    res.redirect('/tweets');
}

async function like(req, res) {
    const like = await Like.findOne({tweet: req.params.id, user:req.user._id.toString()});
    req.body.user = req.user._id
    console.log(req.user._id)
    req.body.tweet = req.params.id
    console.log(like,"exist")
    if(!like) {
        await Like.create(req.body)
    }
    res.redirect('/tweets')    

}