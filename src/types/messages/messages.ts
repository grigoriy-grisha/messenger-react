export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const ME_ADD_MESSAGE = "ME_ADD_MESSAGE";
export const READ_MESSAGE = "READ_MESSAGE";

export interface IMessages {
  createdAt: Date;
  _id: string;
  dialog: {
    author: string;
    createdAt: Date;
    lastMessage: string;
    partner: string;
    updatedAt: Date;
    _id: string;
  };
  read: boolean;
  text: string;
  updatedAt: Date;
  user: {
    confirmed: boolean;
    createdAt: Date;
    fullname: string;
    last_seen: Date;
    updatedAt: Date;
    _id: string;
  };
  message?: string;
}
export interface INewMessage {
  userId: string;
  data: {
    dialogId: string;
    userId: string;
  };
}
export interface IUnreadMessages {
  author: string;
  createdAt: Date;
  dialog: string;
  lastMessage: string;
  partner: string;
  updatedAt: Date;
  _id: string;
}

export interface fetchMessages {
  type: typeof FETCH_MESSAGES;
  payload: IMessages[];
}

export interface meAddMessage {
  type: typeof ME_ADD_MESSAGE;
  payload: {
    message: IMessages;
    unreadMessages: IMessages[];
  };
}

export interface readMessage {
  type: typeof READ_MESSAGE;
  payload: INewMessage;
}

export type MessagesType = fetchMessages | meAddMessage | readMessage;
