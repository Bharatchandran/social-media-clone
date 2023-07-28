const User = require('../models/user')
const Message = require('../models/message');
const MessageGroup = require('../models/messageGroup');

module.exports = {
    message,
    create
}

async function message(req, res) {
    console.log("test")
    let userId = req.params.id;
    let currentUser = req.user._id;
    let messageGroup = await MessageGroup.findOne({user1: currentUser, user2: userId});
    if(!messageGroup){
        messageGroup = await MessageGroup.findOne({user1: userId, user2: currentUser});
    }
    const messages = await Message.find({messageChannel:messageGroup._id}).sort({createdAt:-1}).populate('user')
    console.log(messages)
    console.log(userId,"---",currentUser)
    res.render('messages/index',{
        userId,
        messages
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