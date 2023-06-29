import React, { useEffect, useRef, useState } from "react";

/** import material UI components */
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Send, Attachment, ArrowBack } from "@mui/icons-material";

const ChatArea = ({ selectedChatId, handleCloseChat }) => {
  const myId = 9;

  const [messageText, setMessageText] = useState("");

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

  /** run to scroll */
  useEffect(() => {
    const chatMessages = document.querySelector(`#chatmessages`);
    if (chatMessages) {
      chatMessages.scrollTo(0, chatMessages.scrollHeight);
    }
  });

  /** this use will run  */
  useEffect(() => {
    findChat();
  }, [selectedChatId, messages]);

  const menueHandler = () => {
    setIsMenueOpen(!isMenueOpen);
  };

  const senderHandler = async (event) => {
    event.preventDefault();

    if (!messageText.trim()) {
      return;
    }

    try {
      const myId = 9;
      const payload = {
        text: messageText,
        from: myId,
        to: 5,
        chatId: 1,
      };
      setMessages((prev) => [...prev, payload]);

      setMessageText("");
    } catch (error) {
      console.log("senderHandler Error ------------------>", error);
    }
  };

  const submitOnEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      senderHandler(event);
    }
  };

  return (
    <div className="chat-area">
      {selectedChat?.length ? (
        <div className="chat">
          {/* chat header contain button to close a chat */}
          <div className="chat-header">
            <div className="profileDetail">
              <img src={"e"} alt="Profile" />

              <h2>{`Other Participant Name`}</h2>
            </div>
            <Tooltip arrow title="Close Chat" className="closeChatToolTip">
              <IconButton
                className="close-chat-button"
                onClick={handleCloseChat}
              >
                <ArrowBack className="closeChatIcon" />
              </IconButton>
            </Tooltip>
          </div>

          {/* chat messages div contain all messages of a specific chatId  */}
          <div className="chat-messages" id="chatmessages">
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

          {/* message sender div contain form to sent message  */}
          <div className="messageSenderDiv">
            <form className="messageForm" onSubmit={senderHandler}>
              <i className="attachment-i" onClick={menueHandler}>
                <Attachment className="attachmentIcon" style={{}} />
              </i>

              <TextField
                autoFocus
                variant="standard"
                className="messageInput"
                name=""
                id="outline-textarea"
                // inputRef={messageText}
                onChange={(e) => setMessageText(e?.target?.value)}
                maxRows={4}
                fullWidth
                multiline
                placeholder="Type message here ..."
                InputProps={{
                  disableUnderline: true,
                }}
                value={messageText}
                onKeyDown={submitOnEnter}
              ></TextField>

              <button
                disabled={!messageText}
                type="submit"
                className={`sendButton ${
                  !messageText.trim() ? "disabledBtn" : ""
                }`}
              >
                {messageText.trim()}
                <Send
                  className={`sendIcon ${
                    !messageText.trim() ? "disabledIcon" : ""
                  }`}
                />
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
