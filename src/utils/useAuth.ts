import { useState, useCallback, useEffect } from "react";

const storageName: string = "userData";

export const useAuth = () => {
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState("");

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken("");
    setUserId("");
    localStorage.removeItem(storageName);
  }, []);
  interface IStroage {
    token: string;
    userId: string;
  }

  useEffect(() => {
    let data: IStroage;
    const dataStorage: string | null = localStorage.getItem(storageName);

    if (dataStorage) {
      data = JSON.parse(dataStorage);
      if (data && data.token) {
        login(data.token, data.userId);
      }
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
