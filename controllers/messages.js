const User = require('../models/user')
const Message = require('../models/message');
const MessageGroup = require('../models/messageGroup');

module.exports = {
    index,
    message,
    create
}

async function index(req, res) {
    const messageGroup = await MessageGroup.find({}).sort({createdAt : 1}).populate('user1').populate('user2')
    let currentUser = req.user._id
    let user;
    // let messageTo;
    // if(messageGroup.user1 == req.user._id){
    //     messageTo = await User.find({user: messageGroup.user2 })
    // } else {
    //     messageTo = await User.findOne({user: messageGroup.user1 })
    // }
    res.render('messages/index', {
        messageGroup,
        currentUser,
        user,
        title: "Message"
    })
}

async function message(req, res) {
    let userId = req.params.id;
    let currentUser = req.user._id;
    let messageGroup = await MessageGroup.findOne({user1: currentUser, user2: userId});
    if(!messageGroup){
        messageGroup = await MessageGroup.findOne({user1: userId, user2: currentUser});
    }
    const messages = await Message.find({messageChannel:messageGroup._id}).sort({createdAt:-1}).populate('user')
    res.render('messages/show',{
        userId,
        messages,
        currentUser,
        title:"Chat"
    })
}

// async function create(req, res) {
//     const currentUser = req.user._id;
//     const messageToUser = req.params.id;
//     req.body.user1 = req.user._id
//     req.body.user2 = req.params.id
//     let user = currentUser;
//     let message = req.body.message;
//     console.log(req.body.message,"message")
//     console.log(user,"user")
//     let messages = {
//         user,
//         message
//     }
//     let messageCollection = await Message.find({ user1: currentUser, user2: messageToUser });
//     console.log(messageCollection)
//     console.log(messages)
//     // if(! await Message.find({user1:currentUser, user2: messageToUser}) || await Message.find({user1:messageToUser, user2: currentUser})) {
//     //     await Message.create(req.body)
//     // }

//     console.log({currentUser},{messageToUser})
//     // console.log("current userId = ",req.user._id)
// }

async function create (req, res) {
    const currentUser = req.user._id;
    const messageToUser = req.params.id;
    let messageGroup = await MessageGroup.findOne({user1: currentUser, user2: messageToUser});
    if(!messageGroup){
        messageGroup = await MessageGroup.findOne({user1: messageToUser, user2: currentUser});
        
    }
    if(!messageGroup){
        messageGroup = await MessageGroup.create({user1: currentUser, user2: messageToUser})
    }
    req.body.user = currentUser;
    req.body.messageChannel = messageGroup._id;
    await Message.create(req.body)
    res.redirect(`/messages/${messageToUser}`)
    //     req.body.user1 = req.user._id
//     req.body.user2 = req.params.id
}