import React, { useEffect, useState, memo } from "react";
import { loginContext } from "./exportContext";
import { db } from "../firebase-config,js";
import { collection, getDocs } from "firebase/firestore";

export function LoginContextProvider({ user, setUser, children }) {
  const contextvalue = {
    user,
    setUser,
  };
  useEffect(() => {
    console.log("user rendered");
  }, []);
  return (
    <loginContext.Provider value={contextvalue}>
      {children}
    </loginContext.Provider>
  );
}
