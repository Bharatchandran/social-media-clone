const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports={
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String,
   
    createdAt: {
        type: Date,
        default:function() {
        let date = new Date();
        return date;
    }
}}