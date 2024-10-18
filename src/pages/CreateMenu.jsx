import { useContext, useEffect, useState } from "react";
import React from "react";
import { loginContext, menuContext } from "../context/exportContext";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config,js";

export const CreateMenu = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [id, setId] = useState();

  const { user } = useContext(loginContext);
  const {
    addMenuItem,
    menuData,
    menuRef,
    getMenu,
    setMenuData,
    deleteMenuItem,
  } = useContext(menuContext);
  const inputClasses = "w-1/2 text-black";

  useEffect(() => {
    if (user?.menuCollectionId) {
      menuRef.current = collection(db, user.menuCollectionId);
      getMenu().then((data) => {
        setMenuData([...data]);
        console.log(menuData);
      });
      // console.log("cool");
      // console.log(typeof menuData);
    }
  }, [user]);
  return (
    <div className="flex text-white">
      <div className="flex flex-col w-2/3 items-center justify-center h-screen">
        <div></div>
        <h1>Create your menu</h1>
        {/* Get item id, item name, price*/}
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Item Name"
          className={inputClasses}
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          placeholder="Enter Price"
          className={inputClasses}
        />
        <input
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Enter Category"
          className={inputClasses}
        />
        <input
          onChange={(e) => {
            setId(e.target.value);
          }}
          type="text"
          placeholder="Enter id"
          className={inputClasses}
        />

        <button
          className="p-4 text-white"
          onClick={() => addMenuItem(id, name, category, price)}
        >
          Press
        </button>
        <button onClick={() => console.log(menuData)}>menu</button>
        <button onClick={() => console.log(user)}>user</button>
        <button onClick={() => console.log(menuRef.current)}>menuRef</button>
      </div>
      <div>
        {menuData &&
          menuData.map((item) => (
            <p key={item.id}>
              {item.id} {item.name}
              <button
                onClick={() => {
                  deleteMenuItem(item.id, item.category);
                  console.log(menuData);
                  setMenuData(menuData.splice[(id - 1, 1)]);
                }}
              >
                X
              </button>
            </p>
          ))}
      </div>
    </div>
  );
};
