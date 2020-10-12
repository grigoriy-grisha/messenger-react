import React, { FC, useContext } from "react";
import "./Dialogitem.scss";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { actionsClick } from "../../../redux/actions/clicks/click";

import { lastSeen } from "../../../utils/lastSeen";
import { IDialogs } from "../../../types/dialogs/dialogs";
import { UserContext } from "../../../helpers/UserContext";
import { UnreadedMessages } from "../UnreadedMessages/UnreadedMessages";
import { ClickModalType } from "../../../redux/reducers/clicks/click";
import { AppStateType } from "../../../redux/reducers";

export const DialogItem: FC<IDialogs> = ({
  partner,
  lastMessage,
  author,
  _id,
  createdAt,
  newMessage,
  countUnreadMessages,
}) => {
  const auth = useContext(UserContext);


  let clickOnPerson = useSelector(
    (state: AppStateType): ClickModalType => state.click
  );

  const { idPerson } = clickOnPerson;

 
  let Dateformat = newMessage ? newMessage : createdAt;
  const dispatch = useDispatch();

  let currentDialogs = _id === idPerson ? true : false;
  let person = author._id === auth.userId;
  return (
    <div
      className={
        currentDialogs
          ? "chat__persons chat__persons--current"
          : "chat__persons"
      }
      onClick={() => {
        dispatch(actionsClick.clickOnDialogs(_id));
      }}
    >
      <div className="chat__ava-block">
        <img className="chat__ava-person" src="a.jpg" alt="ava" />
      </div>
      <div className="chat__info-person">
        <div className="chat__row">
          <span className="chat__name-person">
            {person ? partner.fullname : author.fullname}
          </span>
          <span className="chat__status-person">{format(Dateformat)}</span>
        </div>
        <div className="chat__row">
          <span className="chat__status-person">
            {lastSeen(person ? partner.last_seen : author.last_seen)}
          </span>
        </div>
        <div className="chat__row">
          <span className="chat__last-message">{lastMessage.text}</span>
          <UnreadedMessages
            countUnreadMessages={countUnreadMessages}
            lastUser={lastMessage._id}
            read={lastMessage.read}
          />
        </div>
      </div>
    </div>
  );
};
