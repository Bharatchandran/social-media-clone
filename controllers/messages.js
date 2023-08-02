const User = require('../models/user')
const Message = require('../models/message');
const MessageGroup = require('../models/messagegroup');

module.exports = {
    index,
    message,
    create,
    find: findPeople
}

async function index(req, res) {
    const messageGroup = await MessageGroup.find({}).sort({createdAt : 1}).populate('user1').populate('user2')
    console.log(messageGroup,"====")
    let currentUser = req.user._id
    let user;
    // const populateMsg = await MessageGroup.find({}).sort({createdAt : 1}).populate('user1').populate('user2')
    // console.log(populateMsg)

    // const messageGroupTest = await populateMsg.find({$or:[{'user1.name': "BHARAT"},{'user2.name': "BHARAT"}]}).sort({createdAt : 1})
    // console.log(messageGroupTest,"=============")
    // const messageGroupTest = await MessageGroup.find({$or:[{'user1.name': "BHARAT"},{'user2.name': "BHARAT"}]}).sort({createdAt : 1}).populate('user1').populate('user2')
    // console.log(messageGroupTest,"+-+-+-")
    // const msgTest = await MessageGroup.find({$or:[{user1: currentUser},{user2: currentUser}]}).sort({createdAt : 1}).populate('user1').populate('user2')
    // console.log(msgTest)
    // let messageTo;
    // if(messageGroup.user1 == req.user._id){
    //     messageTo = await User.find({user: messageGroup.user2 })
    // } else {
    //     messageTo = await User.findOne({user: messageGroup.user1 })
    // }
    const formPath = "/messages/find"
    res.render('messages/index', {
        messageGroup,
        currentUser,
        user,
        title: "Message",
        formPath
    })
}
async function findPeople(req, res) {
    console.log(req.query.name)
    let messageGroup = await MessageGroup.find({}).sort({createdAt : 1}).populate('user1').populate('user2')
    

    const messageTest = messageGroup.find(el => {
        if(el.user1.name === req.query.name){
         return el
        } 
        if(el.user2.name === req.query.name){
            return el
        }
    } )
    messageGroup = messageTest
    let currentUser = req.user._id
    let user;
    console.log(messageGroup,"====",messageTest)
    // let messageTo;
    // if(messageGroup.user1 == req.user._id){
    //     messageTo = await User.find({user: messageGroup.user2 })
    // } else {
    //     messageTo = await User.findOne({user: messageGroup.user1 })
    // }
    const formPath = "/messages/find"
    res.render('messages/searchPerson', {
        messageGroup,
        currentUser,
        user,
        title: "Message",
        formPath
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
    console.log("Message Create====")
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