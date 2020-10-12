import React from "react";

interface IUserContext {
  userId: string;
  login: (jwtToken: string, id: string) => void;
  token: string;
  logout: () => void;
}

let options = {
  userId: "",
  login: () => {},
  token: "",
  logout: () => {}
};
export const UserContext = React.createContext<IUserContext>(options);
