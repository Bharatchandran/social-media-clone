const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema ({
    
    user: String,
    tweet: String
}, {
    timestamps : true
})

module.exports= mongoose.model('Like', likeSchema);