import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";
import { MainRouter } from "./router/index";

import "./index.scss";


// saveInStorage('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWY0MzZhY2YyNTk5NjYyMDI0M2RiYTFhIiwiaWF0IjoxNTk4MjUzODQ2LCJleHAiOjE1OTgyODk4NDZ9.TABXcS4RL6eZ8qHA8aY7hyx0wJ-WAeGqBDdLh-oGjF8')
const app = (
    
  <Provider store={store}>
    <MainRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
