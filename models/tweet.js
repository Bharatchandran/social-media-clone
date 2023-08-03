const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const schemaTemplate = require('./schemaTemplate');


const replySchema = new Schema( schemaTemplate )
let test = {reply:[replySchema]}
Object.assign(schemaTemplate,test)

const tweetSchema = new Schema(schemaTemplate, {timestamps: true})



module.exports = mongoose.model('Tweet', tweetSchema);