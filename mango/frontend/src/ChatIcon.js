import React, { useState } from 'react';
import ChatBox from './chatbox'; // Ensure you have the ChatBox component in the same directory

const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChatClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 cursor-pointer">
        <button
          onClick={handleChatClick}
          className="bg-green-500 hover:bg-green-700 text-white rounded-full p-4 shadow-lg"
        >
          💬
        </button>
      </div>
      {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatIcon;
