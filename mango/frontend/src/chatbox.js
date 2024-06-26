// ChatBox.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useauth";

const ChatBox = ({ onClose }) => {
  const { curr, whichUser, loading, setCurr, setWhichUser } = useAuth();
  const { id } = useParams();
  const [chats, setChats] = useState([
        {sender: "messi",
        content: "i am best footballer"},
        {
            sender: "Ronaldo",
            content: "Teri Maa ki ch***  i am best "   
        },

        {
            sender: "Aditya",
            content: "i am best"   
        },

        {
          sender: "messi",
          content: "i agree"
        },
        {
                sender: "Ronaldo",
                content: "i agree"   
        },



  ]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if(curr!=null)
    fetchChats();
  }, [curr]);



  const fetchChats = async () => {
    try {
      const response = await fetch('http://localhost:5000/getChats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({curr,id}),
      });

      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const newChat = {
      sender: curr, // Replace with the actual current user
      content: message,
    };

    try {
      const response = await fetch('http://localhost:5000/addChat/'+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChat),
      });

      const savedChat = await response.json();
      setChats([...chats,newChat]);
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-teal-400 text-white py-2 px-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button onClick={onClose} className="text-white">
          &times;  
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-scroll">
        {chats.map((chat, index) => (
          <div key={index} className="mb-2">
            <b className="text-green-600">{chat.sender}:</b> {chat.content}
          </div>
        ))}
      </div>
      <div className="p-2 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mr-2 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
