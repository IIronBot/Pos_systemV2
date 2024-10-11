import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../context/exportContext";

export function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [selectedButton, setSelectedButton] = useState("null");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const { user, setUser } = useContext(loginContext);

  const navigate = useNavigate();
  const auth = getAuth();
  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log(user);
      })
      .catch((error) => console.log(error));
  }

  function createUser(email, password) {
    if (password === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
    console.log(passwordMatch);
    if (!passwordMatch) {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        setUser(userCredential.user);
        console.log(user);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if (user?.email != null || user?.email != undefined) {
      navigate("/jobchoice");
    }
    console.log(user?.email);
  }, [user]);

  const inputStyle = "bg-primary-color text-white w-2/3 my-4 px-2 py-1";
  const buttonStyle =
    "px-5 py-2 m-5 text-white border-primary-color border-[2px] transition-colors ";
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex justify-center align-center items-center flex-col w-1/3 h-1/2 border-black border-4 bg-secondary-color">
          {/* <h1>Login</h1> */}
          <input
            type="text"
            className={inputStyle}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={inputStyle}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {selectedButton == "signup" && (
            <input
              type="password"
              className={inputStyle}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <div>
            <button
              onClick={() => {
                setSelectedButton("login");
                console.log(selectedButton);
                signIn(email, password);
              }}
              className={
                buttonStyle +
                (selectedButton == "login"
                  ? "bg-secondary-color"
                  : "bg-primary-color")
              }
            >
              Login
            </button>
            <button
              onClick={() => {
                setSelectedButton("signup");
                console.log("creating user");
                createUser(email, password);
              }}
              className={
                buttonStyle +
                (selectedButton == "signup"
                  ? "bg-secondary-color "
                  : "bg-primary-color ")
              }
            >
              Sign Up
            </button>
            {passwordMatch && <p>Passwords do not match try again</p>}
            <button onClick={() => console.log(user)}>action</button>
          </div>
        </div>
      </div>
    </>
  );
}
