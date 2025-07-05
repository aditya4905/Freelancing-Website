const { Server } = require("socket.io");
const Chat = require("./Schema/chats");

function setupRealtimeChat(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://man-go.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("chatMessage", async (message) => {
      const { sender, receiver, content } = message;

      try {
        // Check if a chat document exists for the sender and receiver
        let chatDocument = await Chat.findOne({
          $or: [
            { my_username: sender, your_username: receiver },
            { my_username: receiver, your_username: sender },
          ],
        });

        // Create a new chat document if none exists
        if (!chatDocument) {
          chatDocument = new Chat({
            my_username: sender,
            your_username: receiver,
            chats: [],
          });
        }

        // Add the new message to the chat document
        chatDocument.chats.push({ sender, content });
        await chatDocument.save();

        // Emit the new message to all connected clients
        io.emit("chatMessage", message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = setupRealtimeChat;
