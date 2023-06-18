import { useState } from "react";

import "../Styles/style.css";

/** import components */
import ChatList from "../Components/ChatList";
import ChatArea from "../Components/ChatArea";
import NavigationBar from "../Components/NavigationBar";

const Home = () => {
  const chats = [
    {
      id: 1,
      contactName: "John",
      profilePhoto: "profile1.jpg",
      lastMessage: "Hey, how are you?",
    },
    {
      id: 2,
      contactName: "Emma",
      profilePhoto: "profile2.jpg",
      lastMessage: "Hi there!",
    },
  ];

  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleChatSelection = (chatId) => {
    // const selectedChatId = chats.find((chat) => chat.id === chatId);
    setSelectedChatId(chatId);
  };

  const handleCloseChat = () => {
    setSelectedChatId(null);
  };

  console.log("selectedChatId 222222222--------->", selectedChatId);

  return (
    <div className="app">
      {/* <NavigationBar /> */}
      <div className="content">
        <ChatList chats={chats} handleChatSelection={handleChatSelection} />
        <ChatArea
          selectedChatId={selectedChatId}
          handleCloseChat={handleCloseChat}
        />
      </div>
    </div>
  );
};

export default Home;
