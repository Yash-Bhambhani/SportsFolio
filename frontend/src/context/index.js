import { createContext, useContext, useState } from "react";
import React, { useEffect } from "react";

const thisContext = createContext();

export default function ContextProvider({ children }) {
  const [username, setUsername] = useState(localStorage.getItem("name"));
  const [password, setPassword] = useState(localStorage.getItem("pass"));
  const [myEvent, setMyEvent] = useState([]);
  const [allEvent, setAllEvent] = useState([]);

  useEffect(() => {
    localStorage.setItem("name", username);
    localStorage.setItem("pass", password);
  }, [username, password]);
  return (
    <thisContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        myEvent,
        setMyEvent,
        allEvent,
        setAllEvent,
      }}
    >
      {children}
    </thisContext.Provider>
  );
}

export const useTheContext = () => {
  return useContext(thisContext);
};
