// import { useState } from "react";
// import photo from "../assets/photo.jpg";

// const ChatList = () => {
//   const [arr, setArr] = useState([
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//     "j",
//   ]);

//   const ChatSearch = () => {
//     console.log("Search");
//   };

//   return (
//     <div className="Chats">
//       <div className="search">
//         <form onSubmit={ChatSearch} className="searchForm">
//           <input type="search" />
//         </form>

//         <div className="chatlist">
//           {arr.map((eachChat, i) => {
//             return (
//               <div className="eachChat">
//                 <img src={photo} alt="" className="chatListPhoto" />
//                 <h3>Robert Hardely</h3>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatList;





import "./ChatList.css";

import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [contacts, setContacts] = useState([
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

  // useEffect(() => {
  //   // Simulating fetching contacts from an API
  //   const fetchContacts = async () => {
  //     try {
  //       const response = await fetch('/api/contacts'); // Replace with your API endpoint
  //       const data = await response.json();
  //       setContacts(data.contacts);
  //     } catch (error) {
  //       console.log('Error fetching contacts:', error);
  //     }
  //   };

  //   fetchContacts();
  // }, []);

  return (
    <div>
      <h1>Contacts</h1>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            // <li key={contact.id}>{contact.name}</li>

<li>Contact Name</li>

          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
















