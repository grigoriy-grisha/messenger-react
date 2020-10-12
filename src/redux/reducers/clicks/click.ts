import { ActionClickType } from "../../actions/clicks/click";


const initialState = {
  isFindModal: false as boolean,
  idPerson: "" as string,
};

export type ClickModalType = typeof initialState

export const clickReduser = (
  state = initialState,
  action: ActionClickType
): ClickModalType => {
  switch (action.type) {
    case 'CLICK_ON_PERSON': {
      return {
        ...state,
        idPerson: action.payload,
      };
    }
    case 'CLICK_ON_FIND_MODAL': {
      return {
        ...state,
        isFindModal: !state.isFindModal
      };
    }

    default:
      return state;
  }
};
