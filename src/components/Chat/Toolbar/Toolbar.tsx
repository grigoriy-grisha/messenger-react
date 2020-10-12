import React from "react";
import "./Toolbar.scss";

interface IProps {
  activeMessage: Array<string>;
  openDeleteMessage: () => void
}

export const Toolbar: React.FC<IProps> = ({ activeMessage, openDeleteMessage }) => {
  return (
    <div className="toolbar">
      {activeMessage.length ? (
        <div className="toolbar__buttons">
          <button className="toolbar__button ma-r-25">
            Forward: {activeMessage.length}
          </button>
          <button className="toolbar__button ma-r-25" onClick={openDeleteMessage}>
            Delete: {activeMessage.length}
          </button>
        </div>
      ) : (
        ""
      )}
      {/* <input className="toolbar__input-search" placeholder="Введите сообщение для поиска" /> */}

      <div className="toolbar__message-management">
        <button className="toolbar__message-management--item toolbar__search"></button>
      </div>
    </div>
  );
};
