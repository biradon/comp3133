const mongoose = require('mongoose');

const GroupMessageSchema = new mongoose.Schema({
  fromuser: {
    type: String
  },
  room: {
    type: String
  },
  message: {
    type: String
  },
  data_sent: { 
    type: Date
  }
});



const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);
module.exports = GroupMessage;