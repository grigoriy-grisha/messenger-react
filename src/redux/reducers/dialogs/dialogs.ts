import {
  FETCH_DIALOGS,
  IDialogs,
  FETCH_FIND_USER,
  SET_LAST_MESSAGE,
  IFindPerson,
  DialogType,
} from "./../../../types/dialogs/dialogs";
import { elemT } from "../../../utils/elemT";
import { ActionDialogType } from "../../actions/dialogs/dialogs";
import { IUnreadMessages } from "../../../types/messages/messages";

const initialState = {
  unreadedMessages: [] as IUnreadMessages[] | [],
  findPersons: [] as Array<IFindPerson> | [],
  dialogs: [] as Array<IDialogs> | [],
  isLoadedDialogs: false as boolean,
};

export type DialogsModalType = typeof initialState;

export const dialogsReduser = (
  state = initialState,
  action: ActionDialogType | DialogType
): DialogsModalType => {
  switch (action.type) {
    case FETCH_DIALOGS: {
      return {
        ...state,
        dialogs: action.payload,
      };
    }
    case "FETCH_REQUEST_DIALOGS": {
      return {
        ...state,
        isLoadedDialogs: action.payload,
      };
    }
    case "ME_ADD_MESSAGE_DIALOG": {
      return {
        ...state,
        dialogs: elemT(state.dialogs).map((item: IDialogs) => {
          if (item._id) {
            console.log(item._id === action.payload.message.dialog._id);

            if (item._id === action.payload.message.dialog._id) {
              item.lastMessage.text = action.payload.message.text;
              item.lastMessage._id = action.payload.message.user._id;
              item.lastMessage.read = action.payload.message.read;
              item.lastMessage.dialog = action.payload.message.dialog._id;
              item.countUnreadMessages = action.payload.unreadMessages.length;
              item.newMessage = action.payload.message.createdAt;
            }
          }

          return item;
        }),
      };
    }
    case FETCH_FIND_USER: {
      return {
        ...state,
        findPersons: filterFindPersont(state.dialogs, action.payload),
      };
    }
    case "CLEAR_PERSONS": {
      return {
        ...state,
        findPersons: [],
      };
    }
    case "UPDATE_DOALOG_READ": {
      return {
        ...state,
        dialogs: elemT(state.dialogs).map((item: IDialogs) => {
          
          
          if (item._id === action.payload.data.dialogId && !!action.payload.userId) {
            console.log(!!action.payload.userId);
            if (action.payload.data.userId === action.payload.userId) {
              item.countUnreadMessages = 0;
            } else {
              item.lastMessage.read = true;
            }
          }
          return item;
        }),
      };
    }

    case SET_LAST_MESSAGE: {
      return {
        ...state,
        dialogs: elemT(state.dialogs).map((item: IDialogs) => {
             
          if (item._id === action.payload.idPerson) {
            item.countUnreadMessages = 0;
            if (action.payload.lastMessage ) {
              item.lastMessage.text = action.payload.lastMessage.text;
              item.lastMessage._id = action.payload.lastMessage.user._id;
              item.lastMessage.read = action.payload.lastMessage.read;
            } else {
              item.lastMessage.text = "";
              item.lastMessage._id = "";
              item.lastMessage.read = false;
            }
          }
          return item;
        }),
      };
    }
    default:
      return state;
  }
};

function filterFindPersont(a: any, b: any) {
  let mySet: any = [];
  a.forEach((dialog: any) => {
    mySet.push(dialog.partner._id);
  });
  return b.filter((item: any) => {
    return !mySet.includes(item._id);
  });
}
