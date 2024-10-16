import { useContext, useEffect, useState } from "react";
import React from "react";
import { loginContext, menuContext } from "../context/exportContext";

export const CreateMenu = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [id, setId] = useState();

  const { user } = useContext(loginContext);
  const { addMenuItem } = useContext(menuContext);
  return (
    <>
      <div>
        <h1>Create your menu</h1>
        {/* Get item id, item name, price*/}
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Item Name"
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          placeholder="Enter Price"
        />
        <input
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Enter Category"
        />
        <input
          onChange={(e) => setId(e.target.value)}
          type="text"
          placeholder="Enter id"
        />

        <button
          className="p-4 text-white"
          onClick={() => addMenuItem(id, name, category, price)}
        >
          Press
        </button>
      </div>
      <div></div>
    </>
  );
};
