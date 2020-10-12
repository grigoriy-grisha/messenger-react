import { IMessages } from "../messages/messages";

export const FETCH_DIALOGS = "FETCH_DIALOGS";
export const FETCH_FIND_USER = "FETCH_FIND_USER";
export const SET_LAST_MESSAGE = "SET_LAST_MESSAGE";

export interface IDialogs {
  _id: string;
  lastMessage: {
    text: string;
    read: boolean;
    dialog: string;
    _id: string;
  };
  createdAt: Date;
  person: boolean;
  partner: {
    fullname: string;
    last_seen: Date;
    _id: string;
  };
  author: {
    fullname: string;
    last_seen: Date;
    _id: string;
  };
  message?: string;
  newMessage: Date;
  fullname: string;
  last_seen: Date;
  countUnreadMessages: number;
}

export interface IFindPerson {
  _id: string;
  newMessage: Date;
  fullname: string;
  last_seen: Date;
}

export interface fetchDialogs {
  type: typeof FETCH_DIALOGS;
  payload: IDialogs[];
}

export interface fetchPersonsDiaolgs {
  type: typeof FETCH_FIND_USER;
  payload: IFindPerson[];
}

export interface setLastMessage {
  type: typeof SET_LAST_MESSAGE;
  payload: {
    lastMessage: IMessages;
    idPerson: string;
  };
}
export type DialogType = fetchDialogs | fetchPersonsDiaolgs | setLastMessage;
