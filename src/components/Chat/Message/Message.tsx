import React, { FC, useContext, useState } from "react";
import { format } from "timeago.js";
import { UserContext } from "../../../helpers/UserContext";

interface IProps {
  read: boolean;
  text: string;
  createdAt: Date;
  _id: string;
  _idUser: string;

  handleMessage: (_id: string) => void;
}

export const Message: React.FC<IProps> = React.memo(({
  text,
  createdAt,
  _idUser,
  _id,
  read,
  handleMessage,
}) => {
  let [select, setSelect] = useState(false);
  const auth = useContext(UserContext);
  const { userId } = auth;

  let ME = userId === _idUser ? false : true;
  return (
    <div
      className={
        !select
          ? ME
            ? "chat__message chat__message"
            : "chat__message chat__message-is-me"
          : ME
          ? "chat__message chat__message chat__message--selected"
          : "chat__message chat__message-is-me chat__message--selected"
      }
      onClick={() => {
        setSelect(!select);
        handleMessage(_id);
      }}
    >
      <div
        className={
          ME
            ? "chat__text chat__text-message"
            : "chat__text chat__text-message-is-me"
        }
      >
        {text}
      </div>
      <span className={ME ? "chat__time" : "chat__time-is-me"}>
        {format(createdAt)}
      </span>
      <span className={ME ? "chat__read" : "chat__read-is-me"}>
        {!ME ? (
          read ? (
            <svg
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.66648 6.87477L10.2103 0.139168C10.3908 -0.0463894 10.6839 -0.0463894 10.8643 0.139168C11.0452 0.324251 11.0452 0.62513 10.8643 0.810213L3.99532 7.88086C3.8167 8.06405 3.51946 8.06405 3.34084 7.88086L0.135337 4.60679C-0.0451125 4.42171 -0.0451125 4.1213 0.135337 3.93575C0.315787 3.75019 0.608904 3.75019 0.789354 3.93575L3.66648 6.87477ZM7.14111 7.06654L14.1548 0.139864C14.3479 -0.0466214 14.6616 -0.0466214 14.8548 0.139864C15.0484 0.325873 15.0484 0.628256 14.8548 0.814264L7.55877 8.13855C7.3676 8.32265 5.87166 7.56707 5.75484 7.46285C5.64238 7.36252 6.30121 6.77489 6.30121 6.77489C6.50611 6.87518 7.08691 7.12008 7.14111 7.06654Z"
                fill="#dbdbdb"
              />
            </svg>
          ) : (
            <svg
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2103 0.139168L3.66648 6.87477L0.789354 3.93575C0.608904 3.75019 0.315787 3.75019 0.135337 3.93575C-0.0451125 4.1213 -0.0451125 4.42171 0.135337 4.60679L3.34084 7.88086C3.51946 8.06405 3.8167 8.06405 3.99532 7.88086L10.8643 0.810213C11.0452 0.62513 11.0452 0.324251 10.8643 0.139168C10.6839 -0.0463894 10.3908 -0.0463894 10.2103 0.139168Z"
                fill="#dbdbdb"
              />
            </svg>
          )
        ) : null}
      </span>
    </div>
  );
})
