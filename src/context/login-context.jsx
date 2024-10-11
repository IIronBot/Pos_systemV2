import React, { useEffect, useState } from "react";
import { loginContext } from "./exportContext";
import { db } from "../firebase-config,js";
import { collection, getDocs } from "firebase/firestore";

export function LoginContextProvider(props) {
  const [user, setUser] = useState({
    email: null,
    uid: null,
  });
  const contextvalue = {
    user,
    setUser,
  };
  return (
    <loginContext.Provider value={contextvalue}>
      {props.children}
    </loginContext.Provider>
  );
}
