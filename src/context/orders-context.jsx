import React, { memo, useContext, useEffect, useState } from "react";
import { orderContext, menuContext, loginContext } from "./exportContext";
import ordersound from "../assets/ordersound.mp3";

import { db } from "../firebase-config,js";
import { setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const playSound = () => {
  new Audio(ordersound).play();
};

export function OrderContextProvider({ user, setUser, children }) {
  const [orderNum, setOrderNum] = useState();
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [noteValue, setNoteValue] = useState(null);
  const [status, setStatus] = useState("");
  const ordersRef = collection(db, user?.ordersCollectionId || "Menu");

  const { cartItems, setCartItems, getDefaultCart } = useContext(menuContext);
  const [orders, setOrders] = useState(null);

  const fetchOrders = async () => {
    const orderDocs = await getDocs(ordersRef);
    const unsortedOrders = orderDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setOrders(unsortedOrders.sort((a, b) => a.ordernum - b.ordernum));
    // if (!orderNum) {
    //   setOrderNum(orderDocs.docs.length + 1);
    // }
    console.log("orderdocslength: " + orderDocs.docs.length);
  };

  //listen for changes to data when context mounts
  useEffect(() => {
    // When you call onSnapshot, it returns an unsubscribe function that you can use to stop listening to changes.
    if (!user) return;
    const unsubscribe = onSnapshot(
      collection(db, user?.ordersCollectionId || "orders"),
      (snapshot) => {
        const updatedOrders = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (orders) {
          setOrders(updatedOrders.sort((a, b) => a.ordernum - b.ordernum));
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const buildOrderData = (data, orderNum, noteValue) => {
    setIsOrderLoading(true);
    let orderedItems = [];
    let idList = "";
    for (let i = 0; i < Object.keys(cartItems).length; i++) {
      if (cartItems[i] > 0) {
        console.log(data[i]);
        orderedItems.push(data[i]);
      }
    }

    orderedItems.map((item) => {
      idList += `${cartItems[item.id]}:${data[item.id].id},`;
    });

    const temp = {
      ids: idList,
      status: "Not Started",
      notes: noteValue,
      ordernum: orderNum,
    };

    // setOrderNum(orderNum + 1);
    setCartItems(getDefaultCart());
    return temp;
  };

  const updateOrderStatus = async (orderNum, newStatus) => {
    const statusRef = doc(db, "Current Orders", orderNum);
    await updateDoc(statusRef, { status: newStatus });
  };

  const deleteOrder = async (ordernum) => {
    await deleteDoc(doc(db, "Current Orders", ordernum)).then(() =>
      console.log("deleted")
    );
  };

  const postOrder = async (order) => {
    const docRef = doc(db, "Current Orders", orderNum.toString());
    await setDoc(docRef, order);
    playSound();
  };

  useEffect(() => console.log("orders rendered"), []);
  const contextValue = {
    postOrder,
    orders,
    setOrders,
    buildOrderData,
    orderNum,
    setOrderNum,
    fetchOrders,
    isOrderLoading,
    setIsOrderLoading,
    noteValue,
    setNoteValue,
    updateOrderStatus,
    status,
    setStatus,
    deleteOrder,
  };
  return (
    <orderContext.Provider value={contextValue}>
      {children}
    </orderContext.Provider>
  );
}
