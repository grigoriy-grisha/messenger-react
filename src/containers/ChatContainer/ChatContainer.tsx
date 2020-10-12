import React from "react";
import "./ChatContainer.scss";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import DialogsContainer from "../DialogsContainer/DialogsContainer";


const ChatContainer = (props: any) => {

  return (
    <div className="container">
      <div className="chat">
        <DialogsContainer />
        <MessagesContainer />
      </div>
    </div>
  );
};

export default ChatContainer
