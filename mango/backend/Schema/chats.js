const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, { _id: false });

const chatsSchema = new Schema({
  my_username: {
    type: String,
    required: true,
  },
  your_username: {
    type: String,
    required: true,
  },
  chats: {
    type: [chatMessageSchema], // Array of objects with sender and content
    required: false,
    default: [], // Initialize with an empty array by default
  }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatsSchema);
module.exports = Chat;
