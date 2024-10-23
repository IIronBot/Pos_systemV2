import { useContext, useEffect, useState } from "react";
import React from "react";
import { loginContext, menuContext } from "../context/exportContext";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config,js";
import { BackArrow } from "../components/BackArrow";
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
  const inputClasses =
    "w-1/2 text-black rounded my-2 p-2 border-2 border-black";

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
  }, []);
  return (
    <div className="flex text-white">
      <div className="flex flex-col w-1/2 items-center justify-center h-screen bg-secondary-color text-black">
        <div></div>
        <BackArrow className="text-black" data={""} />
        <h1 className="h-10 bg-primary-color text-white w-1/2 font-bold text-center rounded-t-md">
          Add Menu Item
        </h1>
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
          className="border-solid border-black border-2 w-1/2 h-10 rounded-b-md hover:bg-primary-color hover:text-white transition-all"
          onClick={() => addMenuItem(id, name, category, price)}
        >
          Add
        </button>
        {/* <button onClick={() => console.log(menuData)}>menu</button>
        <button onClick={() => console.log(user)}>user</button>
        <button onClick={() => console.log(menuRef.current)}>menuRef</button> */}
      </div>
      <div>
        {menuData &&
          menuData.map((item) => (
            <p key={item.id}>
              {item.id} {item.name}
              <button
                onClick={() => {
                  deleteMenuItem(item.id, item.category);
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
