import { React, useState } from "react";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./index.css";
import { MenuContextProvider } from "./context/menu-context.jsx";
import { OrderContextProvider } from "./context/orders-context";
import { LoginContextProvider } from "./context/login-context.jsx";
import Buser from "./pages/Buser";
import { Cashier } from "./pages/Cashier";
import Cook from "./pages/Cook";
import { CreateOrder } from "./pages/CreateOrder";
import { JobChoice } from "./pages/Jobchoice";
import { Login } from "./pages/Login.jsx";
import { CreateMenu } from "./pages/CreateMenu.jsx";

function App({ user, setUser }) {
  console.log("app rerender");
  return (
    <>
      <BrowserRouter>
        <LoginContextProvider user={user} setUser={setUser}>
          <MenuContextProvider user={user} setUser={setUser}>
            <OrderContextProvider user={user} setUser={setUser}>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/jobchoice" element={<JobChoice />} />
                <Route path="/cashier" element={<Cashier />} />
                <Route path="/order" element={<CreateOrder />} />
                <Route path="/cook" element={<Cook />} />
                <Route path="/buser" element={<Buser />} />
                <Route exact path="/createmenu" element={<CreateMenu />} />
              </Routes>
            </OrderContextProvider>
          </MenuContextProvider>
        </LoginContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
