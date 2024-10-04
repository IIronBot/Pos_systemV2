import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

export function BackArrow(prop) {
  //where the link will go
  const location = prop.data;
  return (
    <div>
      <Link to={`/${location}`}>
        <ArrowLeft className="absolute top-1.5 h-10 w-10 m-3" />
      </Link>
    </div>
  );
}
