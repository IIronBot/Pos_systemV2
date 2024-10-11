import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { BackArrow } from "../components/BackArrow";
import { loginContext } from "../context/exportContext";
export function JobChoice() {
  const { setUser } = useContext(loginContext);
  const buttonStyle =
    "bg-transparent rounded-sm border-white border-2 h-20 w-52 cursor-pointer mx-10 hover:bg-[color:var(--secondary-color)] hover:text-black transition-all ease-in";
  return (
    <div className="flex justify-center items-center w-screen h-screen text-white no-underline bg-[var(--primary-color)] ">
      <Link to="/cashier">
        <button className={buttonStyle}>Cashier</button>
      </Link>
      <Link to="/buser">
        <button className={buttonStyle}>Buser</button>
      </Link>
      <Link to="/cook">
        <button className={buttonStyle}>Cook</button>
      </Link>
      <Link to="/">
        <button
          onClick={() => {
            setUser(null);
          }}
          className="absolute top-[5%] right-[5%]"
        >
          Logout
        </button>
      </Link>
    </div>
  );
}
