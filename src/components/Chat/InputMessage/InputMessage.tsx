import React from "react";
import "./InputMessage.scss";
export const InputMessage = (props: any) => {
  const { changeInput, valueMessage, onSubmit, handleSendMessage } = props;

  return (
    <div className="chat__input-message">
      <input
        className="chat__input"
        type="text"
        value={valueMessage}
        onSubmit={onSubmit}
        onChange={changeInput}
        onKeyUp={handleSendMessage}
        placeholder="Send a message..."
      />
      <div className="chat__icons-wrapper">
        <span className="chat__icon chat__smile"></span>
        <span className="chat__icon chat__photos"></span>
        {valueMessage ? (
          <span className="chat__icon chat__send" onClick={onSubmit}></span>
        ) : (
          <span className="chat__icon chat__voice"></span>
        )}
      </div>
    </div>
  );
};
