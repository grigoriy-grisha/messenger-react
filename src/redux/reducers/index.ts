import { clickReduser } from './clicks/click';
import { dialogsReduser} from './dialogs/dialogs';
/* eslint-disable @typescript-eslint/no-namespace */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { messagesReduser } from './messages/messages';

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
const rootReducer = combineReducers({
    router: routerReducer,
    dialogs: dialogsReduser,
    messages: messagesReduser,
    click: clickReduser,
});

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

type ProperiesType<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<ProperiesType<T>>

export default rootReducer;