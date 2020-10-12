import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ChatContainer from "../../containers/ChatContainer/ChatContainer";

import { history } from "../../redux/store";
import { Register } from "../loginRegister/Register";

import { useAuth } from "../../utils/useAuth";
import { UserContext } from "../../helpers/UserContext";
import { Login } from "../loginRegister/Login";


export default function Page() {
  const { token, login, userId, logout } = useAuth();
  const isAuth = !token;
  console.log({ token, login, userId } );
  
  return (
    <Router history={history}>
      <UserContext.Provider value={{ userId, login, token, logout }}>
        {isAuth ? (
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} />
            <Redirect to="/login" />
          </Switch>
        ) : (
          <Switch>
            <ChatContainer path="/dialogs" component={ChatContainer} />
            <Redirect to="/dialogs" />
          </Switch>
        )}
      </UserContext.Provider>
    </Router>
  );
}
