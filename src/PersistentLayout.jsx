import React from "react";
import { LoginContextProvider } from "./context/login-context";
import { MenuContextProvider } from "./context/menu-context";
import { OrderContextProvider } from "./context/orders-context";

const PersistentLayout = ({ children, user, setUser }) => {
  return (
    <LoginContextProvider user={user} setUser={setUser}>
      <MenuContextProvider>
        <OrderContextProvider>{children}</OrderContextProvider>
      </MenuContextProvider>
    </LoginContextProvider>
  );
};

export default PersistentLayout;
