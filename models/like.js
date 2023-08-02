const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema ({
    // user:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
    user: String,
    tweet: String
}, {
    timestamps : true
})

module.exports= mongoose.model('Like', likeSchema);