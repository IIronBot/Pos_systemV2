import React, { useEffect, useState } from "react";
import { menuContext } from "./exportContext";
import { db } from "../firebase-config,js";
import { collection, getDocs } from "firebase/firestore";

export function MenuContextProvider(props) {
  function getDefaultCart() {
    let cart = {};
    for (let i = 0; i < 31; i++) {
      cart[i] = 0;
    }
    console.log("useless");
    return cart;
  }

  const [menuData, setMenuData] = useState(null);
  const [cartItems, setCartItems] = useState(() => getDefaultCart());
  const [noteRender, setNoteRender] = useState(false);
  const menuRef = collection(db, "Menu");

  function addToCart(itemId) {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  }

  function removeFromCart(itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  }
  const updateCart = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const getMenu = async () => {
    const allDocs = await getDocs(menuRef);
    const unsortedMenu = allDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMenuData(unsortedMenu.sort((a, b) => a.id - b.id));
  };
  useEffect(() => {
    getMenu();
  }, []);

  const contextvalue = {
    menuData,
    setMenuData,
    setCartItems,
    cartItems,
    addToCart,
    removeFromCart,
    getDefaultCart,
    updateCart,
    noteRender,
    setNoteRender,
    getMenu,
  };
  return (
    <menuContext.Provider value={contextvalue}>
      {props.children}
    </menuContext.Provider>
  );
}
