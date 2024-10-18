import React, { useEffect, useState, useContext, memo, useRef } from "react";
import { menuContext, loginContext } from "./exportContext";
import { db } from "../firebase-config,js";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export function MenuContextProvider({ user, setUser, children }) {
  function getDefaultCart() {
    let cart = {};
    for (let i = 0; i < 31; i++) {
      cart[i] = 0;
    }
    console.log("useless");
    return cart;
  }

  const [menuData, setMenuData] = useState([]);
  const [cartItems, setCartItems] = useState(() => getDefaultCart());
  const [noteRender, setNoteRender] = useState(false);

  const menuRef = useRef(collection(db, user?.menuCollectionId || "Menu"));

  // useEffect(() => {
  //   console.log(menuRef);
  //   console.log(menuRef.current);
  // }, [user, menuRef]);

  async function addMenuItem(id, name, category, price) {
    const docName = id + category;
    const docRef = doc(db, user?.menuCollectionId, docName);
    await setDoc(docRef, {
      id: id,
      name: name,
      category: category,
      price: price,
    });
    console.log("idez: " + id);

    getMenu().then((data) => {
      setMenuData([...data]);
      console.log(menuData);
    });
    console.log("added");
  }

  const deleteMenuItem = async (id, category) => {
    console.log(user?.menuCollectionId);
    console.log("id: " + id);
    console.log("cat: " + category);

    await deleteDoc(doc(db, user?.menuCollectionId, id + category)).then(() =>
      console.log("deleted")
    );
    setMenuData(menuData.filter((item) => item.id != id));
  };

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
    const allDocs = await getDocs(menuRef.current);
    const unsortedMenu = allDocs.docs.map((doc) => ({
      ...doc.data(),
    }));
    // allDocs.docs.map((doc) => console.log(doc.data()));
    return unsortedMenu.sort((a, b) => a.id - b.id);
    // console.log(menuData[0]);
  };
  useEffect(() => {
    console.log("menu rendered");
    getMenu().then((data) => {
      setMenuData([...data]);
      console.log(menuData);
    });
  }, [menuRef]);

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
    addMenuItem,
    deleteMenuItem,
    menuRef,
  };
  return (
    <menuContext.Provider value={contextvalue}>{children}</menuContext.Provider>
  );
}
