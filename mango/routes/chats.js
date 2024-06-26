const express = require('express');
const Chat = require('../Schema/chats'); // Assuming your chat schema is defined in ../Schema/chat
const router = express.Router();

router.post('/getChats', async (req, res) => {
  const { curr, id } = req.body;
  let id1=curr;
  let id2=id;
  try {
    // Find the document where my_username is id1 and your_username is id2, or vice versa
    let chatDocument = await Chat.findOne({
      $or: [
        { my_username: id1, your_username: id2 },
        { my_username: id2, your_username: id1 }
      ]
    });

    if (!chatDocument) {
      // If no chat is found, create a new chat document
      chatDocument = new Chat({
        my_username: id1,
        your_username: id2,
        chats: [] // Initialize with an empty chats array
      });
      await chatDocument.save();
    }

    // Return the chats array from the chat document
    res.json(chatDocument.chats.map(chat => ({ sender: chat.sender, content: chat.content })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/addChat/:id', async (req, res) => {
    const { sender, content } = req.body;
    let id1=req.params.id;
    try {
      // Find the document where my_username is sender or your_username is sender
      let chatDocument = await Chat.findOne({
        $or: [
          { my_username: sender, your_username: id1},
          { your_username: sender,my_username: id1 }
        ]
      });
  
      // Ensure content is provided
      if (!content) {
        return res.status(400).json({ message: 'Content is required' });
      }
  
      // Add the new content to the chats array
      chatDocument.chats.push({ sender, content });
  
      // Save the updated chat document
      await chatDocument.save();
  
      // Return the updated chats array
      res.json(chatDocument.chats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;
