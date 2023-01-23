import { useState } from "react";
import photo from "../../assets/photo.jpg";
import "./ChatList.css";

const ChatList = () => {
  const [arr, setArr] = useState([
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
    "j",
  ]);

  const ChatSearch = () => {
    console.log("Search");
  };

  return (
    <div className="Chats">
      <div className="search">
        <form onSubmit={ChatSearch} className="searchForm">
          <input type="search" />
        </form>

        <div className="chatlist">
          {arr.map((eachChat, i) => {
            return (
              <div className="eachChat">
                <img src={photo} alt="" className="chatListPhoto" />
                <h3>Robert Hardely</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
