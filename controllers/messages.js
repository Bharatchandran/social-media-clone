const User = require('../models/user')
const Message = require('../models/message');
const MessageGroup = require('../models/messagegroup');

module.exports = {
    index,
    message,
    create,
    find: findPeople,
}

async function index(req, res) {
    const messageGroup = await MessageGroup.find({}).sort({createdAt : 1}).populate('user1').populate('user2')
    console.log(messageGroup,"====")
    let currentUser = req.user._id
    let user;
  
   
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
    const queryName = req.query.name

    const messageTest = messageGroup.find(el => {
        if(el.user1.name === req.query.name && el.user2.name === req.user.name ){
         return el
        } 
        if(el.user2.name === req.query.name  && el.user1.name === req.user.name){
            return el
        }
    } )
    
    messageGroup = messageTest
    let currentUser = req.user._id
    let user;
    console.log(messageGroup,"====")
    
    const formPath = "/messages/find"
    res.render('messages/searchPerson', {
        messageGroup,
        currentUser,
        user,
        title: "Message",
        formPath,
        queryName
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
    } else {
        req.body.user = currentUser;
        req.body.messageChannel = messageGroup._id;
        await Message.create(req.body)
    }
   
    res.redirect(`/messages/${messageToUser}`)
    
}

