import React, { useEffect, useRef, useState } from "react";
import {
  Send,
  // KeyboardArrowRight,
  // KeyboardArrowDown,
  Attachment,
} from "@mui/icons-material";
// import SendIcon from "@mui/icons-material/Send";

/** import helpers */
import { sendMessage } from "../Helpers/sendMessage";
import { TextField } from "@mui/material";

const ChatArea = ({ selectedChatId, handleCloseChat }) => {
  console.log("selectedChatId --------->", selectedChatId);

  const myId = 9;

  const messageText = useRef("");
  const [isMenueOpen, setIsMenueOpen] = useState(false);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how are you?", chatId: 1, from: 9, to: 5 },

    { id: 2, text: "I'm good. How about you?", chatId: 1, from: 5, to: 9 },

    { id: 1, text: "Hi there!", chatId: 2, from: 6, to: 9 },

    { id: 2, text: "Hello! How can I help you?", chatId: 2, from: 6, to: 9 },
  ]);

  const [selectedChat, setSelectedChat] = useState([]);

  const findChat = () => {
    setSelectedChat(messages.filter((chat) => chat?.chatId === selectedChatId));
  };

  useEffect(() => {
    findChat();
  }, [selectedChatId]);

  const menueHandler = () => {
    setIsMenueOpen(!isMenueOpen);
    console.log("isMenueOpen ------------------>", isMenueOpen);
  };

  const senderHandler = async (event) => {
    event.preventDefault();

    console.log("senderHandler event --------------------->", event);

    try {
      await sendMessage({
        messageText: messageText.current.value,
        sendTo: 5,
        chatId: 1,
        messages,
        setMessages,
      });
    } catch (error) {
      console.log("senderHandler Error ------------------>", error);
    }
  };

  // const inputKeyHandler = (event) => {
  //   const messageForm = document.querySelector("#messageForm");
  //   if (event.ctrlKey && event.key === "Enter") {
  //     /**  Insert line break */
  //     messageText.current.value += "\n";
  //   } else if (event.key === "Enter") {
  //     event.preventDefault(); // Prevent the default Enter key behavior
  //     messageForm.submit();
  //     // .preventDefault();
  //   }
  // };

  // messageForm.addEventListener("submit", senderHandler);

  console.log("selectedChat --------->", selectedChat);

  return (
    <div className="chat-area">
      {selectedChat.length ? (
        <div className="chat">
          <div className="chat-header">
            <h2>{selectedChat.contactName}</h2>
            <button className="close-chat-button" onClick={handleCloseChat}>
              Close Chat
            </button>
          </div>
          <div className="chat-messages">
            {selectedChat?.map((message) => (
              <p
                key={message.id}
                className={`chatMessage ${
                  message?.from === myId ? "myMessage" : "otherMessage"
                }`}
              >
                {message.text}
              </p>
            ))}
          </div>

          <div className="messageSenderDiv">
            <form
              action=""
              id="messageForm"
              className="messageForm"
              onSubmit={senderHandler}
            >
              <i className="attachment-i" onClick={menueHandler}>
                <Attachment className="attachmentIcon" style={{}} />
              </i>

              <TextField
                autoFocus
                className="messageInput"
                name=""
                id=""
                inputRef={messageText}
                fullWidth={true}
                multiline={true}
                placeholder="Type message here ..."
                // onKeyDown={inputKeyHandler}
              ></TextField>

              {/* TODO toggle button and add action menue of inputs then move to server  */}
              <button type="submit" className="sendButton">
                <Send className="sendIcon" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="initialChatArea">
          <p>Select a chat to start messaging.</p>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
