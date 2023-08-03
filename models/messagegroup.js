const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messagegroupSchema = new Schema({
    user1:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    user2:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, {
    timestamps: true
})

  module.exports = mongoose.model('Messagegroup', messagegroupSchema);