import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

export function BackArrow(prop) {
  //where the link will go
  const location = prop.data;
  return (
    <div>
      <Link to={`/${location}`}>
        <ArrowLeft className="text-white absolute left-[5%] top-[5%] h-10 w-10 m-3" />
      </Link>
    </div>
  );
}
