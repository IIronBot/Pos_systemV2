import React from "react";
import { Link } from "react-router-dom";
import { BackArrow } from "../components/BackArrow.jsx";

import { orderContext } from "../context/exportContext.jsx";
import { useContext, useEffect } from "react";
import OrdersBlock from "../components/OrdersBlock.jsx";
import Loading from "../components/Loading.jsx";
export const Cashier = () => {
  const { orders, fetchOrders } = useContext(orderContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-[color:var(--primary-color)] text-white text-center h-screen">
      <BackArrow data={""} />
      <h1 className="pt-[20px] text-2xl">Cashier</h1>
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
