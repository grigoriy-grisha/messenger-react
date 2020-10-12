import {
  FETCH_MESSAGES,
  ME_ADD_MESSAGE,
  READ_MESSAGE,
  IMessages,
  MessagesType,
} from "./../../../types/messages/messages";
import { fetchApi } from "../../../utils/api/fetchApi";
import { AppStateType, InferActionsTypes } from "../../reducers";
import { ThunkAction } from "redux-thunk";

interface IAddMessage {
  message: IMessages;
  unreadMessages: IMessages[];
}

export const actionMessages = {
  fetchRequestMessages: (isLoaded: boolean) => {
    return {
      type: "FETCH_REQUEST_MESSAGES",
      payload: isLoaded,
    } as const;
  },

  clearMessages: () => ({ type: "CLEAR_MESSAGES" } as const),

  pushActiveMessage: (_id: string) => {
    return {
      type: "PUSH_MESSAGE",
      payload: _id,
    } as const;
  },

  unPushActiveMessage: (_id: string) => {
    return {
      type: "UNPUSH_MESSAGE",
      payload: _id,
    } as const;
  },

  cleanActiveMessage: () => {
    return {
      type: "CLEAN_MESSAGE",
    } as const;
  },

  deleteMessages: () => {
    return {
      type: "DELETE_MESSAGES",
    } as const;
  },
};

export const addMessage = (
  message: IAddMessage,
  userId: string,
  token: string
): ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  MessagesType | ActionMessagesType
> => async (dispatch, getState) => {
  const { click } = getState();
  const { idPerson } = click;
  console.log(userId);

  if (idPerson === message.message.dialog._id && userId) {
    dispatch({
      type: ME_ADD_MESSAGE,
      payload: message,
    });
  }

  if (message.message.user._id !== userId && idPerson) {
    try {
      await fetchApi("POST", token, "readed", {}, `?dialog=${idPerson}`);
    } catch (e) {
      console.log(e);
    }
  }
};

export const getMessages = (
  _id: string,
  token: string
): ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  MessagesType | ActionMessagesType
> => {
  return async (dispatch) => {
    dispatch(actionMessages.fetchRequestMessages(true));
    try {
      const response = await fetchApi(
        "GET",
        token,
        "messages",
        {},
        `?dialog=${_id}`
      );

      dispatch({ type: FETCH_MESSAGES, payload: response });

      dispatch(actionMessages.fetchRequestMessages(false));
    } catch (e) {
      dispatch(actionMessages.fetchRequestMessages(false));
      console.log(e);
    }
  };
};

export const readMessage = (
  data: ISocketReadMessage,
  userId: string
): ThunkAction<
  void,
  AppStateType,
  unknown,
  MessagesType | ActionMessagesType
> => (dispatch, getState) => {
  console.log(userId);

  const { click } = getState();
  const { idPerson } = click;

  if (idPerson && userId) {
    dispatch({
      type: READ_MESSAGE,
      payload: {
        data: data,
        userId: userId,
      },
    });
  }
};

export type ActionMessagesType = InferActionsTypes<typeof actionMessages>;
