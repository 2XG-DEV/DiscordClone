import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectChannelName, selectChannelId } from "./appSlice";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { selectUser } from "./userSlice";
import db from "./firebase";
import firebase from "firebase";
const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    console.log(messages);
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => {
          return (
            <Message
              timestamp={message.timestamp}
              message={message.message}
              user={message.user}
            />
          );
        })}
      </div>

      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form>
          <input
            placeholder={`Message #${channelName}`}
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
          >
            SendMessage
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcard />
          <Gif />
          <EmojiEmotions />
        </div>
      </div>
    </div>
  );
};

export default Chat;
