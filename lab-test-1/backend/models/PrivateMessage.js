const mongoose = require('mongoose');

const PrivateMessageSchema = new mongoose.Schema({
  fromuser: {
    type: String
  },
  touser: {
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



const PrivateMesasge = mongoose.model("PrivateMesasge", PrivateMessageSchema);
module.exports = PrivateMesasge;