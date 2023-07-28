const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const messageSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    message: String
  }, {
    timestamps: true
  });

 module.exports = mongoose.model('Message', userSchema);