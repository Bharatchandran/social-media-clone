const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: String,
  messageChannel: {
      type: Schema.Types.ObjectId,
      ref: 'messagegroup',
      required: true
  }
}, {
  timestamps: true
})

 module.exports = mongoose.model('Message', messageSchema);