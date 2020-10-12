import {
  DialogType,
  FETCH_DIALOGS,
  FETCH_FIND_USER,
  SET_LAST_MESSAGE,
} from "./../../../types/dialogs/dialogs";

import { fetchApi } from "../../../utils/api/fetchApi";

import { IMessages } from "../../../types/messages/messages";
import { AppStateType, InferActionsTypes } from "../../reducers";
import { ThunkAction } from "redux-thunk";

interface MessageFetch {
  message: {
    _id: string;
    read: boolean;
    dialog: {
      _id: string;
    };
    text: string;
    user: {
      _id: string;
    };
    createdAt: Date;
    updatedAt: Date;
  };

  unreadMessages: IMessages[];
}

export const actionDialogs = {
  addMessageDialog: (data: MessageFetch) => {
    return {
      type: "ME_ADD_MESSAGE_DIALOG",
      payload: data,
    } as const;
  },

  fetchRequestDialogs: (isLoaded: boolean) => {
    return {
      type: "FETCH_REQUEST_DIALOGS",
      payload: isLoaded,
    } as const;
  },

  clearPersons: () => ({ type: "CLEAR_PERSONS" } as const),

  updateDialogRead: (data: ISocketReadMessage, userId: string) => {
   

      return {
        type: "UPDATE_DOALOG_READ",
        payload: {
          data,
          userId,
        },
      } as const;
    
    
  },
};

export const setLastMessage = (
  idPerson: string | null
): ThunkAction<void, AppStateType, unknown, DialogType> => (
  dispatch,
  getState
) => {
  let lastMessage = getState().messages.messages[
    getState().messages.messages.length - 1
  ];

  if (idPerson) {
    dispatch({
      type: SET_LAST_MESSAGE,
      payload: {
        idPerson,
        lastMessage,
      },
    });
  }
};

export const getDialogs = (
  token: string
): ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  DialogType | ActionDialogType
> => {
  return async (dispatch) => {
    dispatch(actionDialogs.fetchRequestDialogs(true));
    try {
      const response = await fetchApi("GET", token, "dialogs", {}, "");

      dispatch({ type: FETCH_DIALOGS, payload: response });

      dispatch(actionDialogs.fetchRequestDialogs(false));
    } catch (e) {
      dispatch(actionDialogs.fetchRequestDialogs(false));
      console.log("Ашыбка");
      console.log(e);
    }
  };
};

export const getPersons = (
  value: string,
  token: string
): ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  DialogType | ActionDialogType
> => {
  return async (dispatch) => {
    dispatch(actionDialogs.fetchRequestDialogs(true));
    try {
      const response = await fetchApi(
        "GET",
        token,
        "user/find",
        {},
        `?query=${value}`
      );
      // const response = await findUser(token, `?query=${value}`);

      dispatch({ type: FETCH_FIND_USER, payload: response });

      dispatch(actionDialogs.fetchRequestDialogs(false));
    } catch (e) {
      dispatch(actionDialogs.fetchRequestDialogs(false));
      console.log(e);
    }
  };
};

export type ActionDialogType = InferActionsTypes<typeof actionDialogs>;
