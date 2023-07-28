const mongoose = require('mongoose');
 const Schema = mongoose.Schema;


//   const messagesSchema = new Schema({
//     user:{
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true 
//     },
//     message: String
//   })

//  const messageSchema = new Schema({
//     user1: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true 
//     },
//     user2: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     messages:[messagesSchema]

//   }, {
//     timestamps: true
//   });


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