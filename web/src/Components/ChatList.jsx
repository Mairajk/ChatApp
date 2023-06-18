import React, { useState } from "react";
import NavigationBar from "./NavigationBar";

const ChatList = ({ chats, handleChatSelection }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="chat-list">
      <div className="hamburger" onClick={handleToggleExpand}>
        {expanded ? (
          <div  className="cross">X</div>
        ) : (
          <div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        )}
      </div>

      {expanded ? <NavigationBar className={"expanded"} expanded={expanded}/> : null}

      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => handleChatSelection(chat.id)}>
            <img src={chat.profilePhoto} alt="Profile" />
            <div className="chat-details">
              <span className="chat-contact-name">{chat.contactName}</span>
              <span className="chat-last-message">{chat.lastMessage}</span>
            </div>
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default ChatList;
