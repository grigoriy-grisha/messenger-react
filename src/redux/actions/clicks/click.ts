import socket from "../../../utils/socket";
import { InferActionsTypes } from "../../reducers";


export const actionsClick = {
  clickOnDialogs: (id: string) => {
    socket.emit("DIALOGS:JOIN", id);
    return {
      type: "CLICK_ON_PERSON",
      payload: id,
    } as const;
  },

  clickOnFindModal: () => {
    return {
      type: "CLICK_ON_FIND_MODAL",
    } as const;
  },
};



export type ActionClickType = InferActionsTypes<typeof actionsClick>;
