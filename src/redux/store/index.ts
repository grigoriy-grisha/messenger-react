import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from 'react-router-redux';

import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk'

import rootReducer from "../reducers";


export const history = createBrowserHistory();

const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history))
);
const store = createStore(rootReducer, enhancer);


export default store;