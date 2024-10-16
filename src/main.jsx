import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const Root = () => {
  const [user, setUser] = useState({ email: null, uid: null });
  return <App user={user} setUser={setUser} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
