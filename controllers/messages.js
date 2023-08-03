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
    const messageGroup = await MessageGroup.find({}).sort({createdAt : 1}).populate('user1').populate('user2');
    let currentUser = req.user._id;
    let user; // in messages/index.ejs the user to whom you are message is defined 
    const formPath = "/messages/find"; //gives the path for the form action in search bar.ejs
    res.render('messages/index', {
        title: "Message",
        messageGroup,
        currentUser,
        formPath,
        user,
    })
}

async function findPeople(req, res) {
    let messageGroup = await MessageGroup.find({}).sort({createdAt : 1}).populate('user1').populate('user2');
    const queryName = req.query.name;
    const findNameInMsgGroup = messageGroup.find(el => { 
        if(el.user1.name === req.query.name && el.user2.name === req.user.name ){
            return el;
        } 
        if(el.user2.name === req.query.name  && el.user1.name === req.user.name){
            return el;
        }
    } )
    messageGroup = findNameInMsgGroup
    let currentUser = req.user._id
    let user; // in messages/index.ejs the user to whom you are message is defined 
    const formPath = "/messages/find"
    res.render('messages/searchPerson', {
        title: "Message",
        messageGroup,
        currentUser,
        queryName,
        formPath,
        user
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
        title:"Chat",
        currentUser,
        messages,
        userId
    })
}


async function create (req, res) {
    const currentUser = req.user._id;
    const messageToUser = req.params.id;
    let messageGroup = await MessageGroup.findOne({user1: currentUser, user2: messageToUser});
    // If no message group is found with specific users in it new messageGroup is created
    if(!messageGroup){
        messageGroup = await MessageGroup.findOne({user1: messageToUser, user2: currentUser});
    }
    if(!messageGroup){
        messageGroup = await MessageGroup.create({user1: currentUser, user2: messageToUser});
    } else {
        // if a message is present create the message
        if(req.body.message){
            console.log(req.body.message);
            req.body.user = currentUser;
            req.body.messageChannel = messageGroup._id;
            await Message.create(req.body);
        }
    }
    res.redirect(`/messages/${messageToUser}`)
}

