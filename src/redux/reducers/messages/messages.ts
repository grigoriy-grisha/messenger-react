import {
  FETCH_MESSAGES,
  ME_ADD_MESSAGE,
  IMessages,
  READ_MESSAGE,
  MessagesType,
} from "./../../../types/messages/messages";

import { elemT } from "../../../utils/elemT";
import { ActionMessagesType } from "../../actions/messages/messages";

const initialState = {
  lastMessages: null as IMessages | null,
  activeMessage: [] as Array<string> | [],
  messages: [] as Array<IMessages> | [],
  isLoadedMessages: false as boolean,
};

export type MessagesModalType = typeof initialState;

export const messagesReduser = (
  state = initialState,
  action: ActionMessagesType | MessagesType
): MessagesModalType => {
  switch (action.type) {
    case "FETCH_REQUEST_MESSAGES": {
      return {
        ...state,
        isLoadedMessages: action.payload,
      };
    }
    case FETCH_MESSAGES: {
      return {
        ...state,
        messages: action.payload,
      };
    }
    case ME_ADD_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    }
    case READ_MESSAGE: {
      return {
        ...state,
        messages: elemT(state.messages).map((item: IMessages) => {


          if (
            item.dialog._id === action.payload.data.dialogId &&
            item.user._id !== action.payload.data.userId &&
            action.payload.data.userId
          ) {
            item.read = true;
          }

          return item;
        }),
      };
    }
    case "CLEAR_MESSAGES": {
      return {
        ...state,
        messages: [],
      };
    }

    case "PUSH_MESSAGE": {
      return {
        ...state,
        activeMessage: [...state.activeMessage, action.payload],
      };
    }
    case "UNPUSH_MESSAGE": {
      return {
        ...state,
        activeMessage: state.activeMessage.filter(
          (item) => item !== action.payload
        ),
      };
    }
    case "CLEAN_MESSAGE": {
      return {
        ...state,
        activeMessage: [],
      };
    }
    case "DELETE_MESSAGES": {
      return {
        ...state,
        messages: deleteAndFilterMessages(state.activeMessage, state.messages),
      };
    }
    default:
      return state;
  }
};

function deleteAndFilterMessages(
  activeMessage: Array<string>,
  messages: IMessages[]
) {
  let dublicateMessages = messages;

  for (let i = 0; i < activeMessage.length; i++) {
    const id: string = activeMessage[i];
    dublicateMessages = dublicateMessages.filter((item: IMessages) => {
      return item._id !== id;
    });
  }
  return dublicateMessages;
}
