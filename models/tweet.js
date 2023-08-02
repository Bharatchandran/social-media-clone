const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const schemaTemplate = require('./schemaTemplate');


const replySchema = new Schema( schemaTemplate )
let test = {reply:[replySchema]}
Object.assign(schemaTemplate,test)
// const likeSchema = new Schema ({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }
// })
// Object.assign(schemaTemplate, likeSchema);
const tweetSchema = new Schema(schemaTemplate, {timestamps: true})

// const tweetSchema = new Schema(
//     {
//     content: {
//         type: String,
//         required: true
//     },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     userName: String,
//     userAvatar: String,
   
//     createdAt: {
//         type: Date,
//         default:function() {
//         let date = new Date();
//         return date;
//     }, 
//     replyTweet: [replySchema]
// }
    
// }, {
//     timestamps: true
// })


module.exports = mongoose.model('Tweet', tweetSchema);