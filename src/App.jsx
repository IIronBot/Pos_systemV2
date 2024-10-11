import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <LoginContextProvider>
        <MenuContextProvider>
          <OrderContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/jobchoice" element={<JobChoice />} />
                <Route path="/cashier" element={<Cashier />} />
                <Route path="/order" element={<CreateOrder />} />
                <Route path="/cook" element={<Cook />} />
                <Route path="/buser" element={<Buser />} />
              </Routes>
            </Router>
          </OrderContextProvider>
        </MenuContextProvider>
      </LoginContextProvider>
    </>
  );
}

export default App;
