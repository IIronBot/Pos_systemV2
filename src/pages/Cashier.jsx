import React from "react";
import { Link } from "react-router-dom";
import { BackArrow } from "../components/BackArrow.jsx";

import { menuContext, orderContext } from "../context/exportContext.jsx";
import { useContext, useEffect, useRef } from "react";
import { loginContext } from "../context/exportContext.jsx";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config,js";

import OrdersBlock from "../components/OrdersBlock.jsx";
import Loading from "../components/Loading.jsx";
export const Cashier = () => {
  const { user } = useContext(loginContext);
  const { orders, fetchOrders, setOrders, setOrderNum, menuRef, ordersRef } =
    useContext(orderContext);

  const { getMenu, setMenuData, menuData } = useContext(menuContext);
  useEffect(() => {
    console.log("USER USER USER");
    console.log(user.menuCollectionId);
    console.log(user);

    console.log(user.ordersCollectionId);

    if (!user.menuCollectionId) return;
    if (!user.ordersCollectionId) return;
    console.log("after");

    fetchOrders().then((data) => {
      setOrders([...data]);
    });

    getMenu().then((data) => {
      setMenuData([...data]);
    });

    if (!orders) setOrders([]);

    if (orders == []) {
      setOrderNum(0);
    }
    console.log("WORKMAN");
    console.log(orders);
  }, []);

  return (
    <div className="bg-[color:var(--primary-color)] text-white text-center h-screen">
      <BackArrow data={""} />
      <h1 className="pt-[20px] text-2xl">Cashier</h1>
      <button onClick={() => console.log(ordersRef)}>button</button>

      <Link to="/order">
        <button className="h-[50px] w-[150px] border-black text-black bg-white absolute top-[75px] right-[12%] rounded hover:bg-[color:var(--secondary-color)] transition-all pointer">
          Create Order
        </button>
      </Link>
      <div className="currentOrders">
        {orders ? <OrdersBlock /> : <Loading />}
      </div>
    </div>
  );
};
