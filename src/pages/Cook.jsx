import React from "react";
import { useContext, useEffect } from "react";
import { menuContext, orderContext } from "../context/exportContext";
import OrdersBlock from "../components/OrdersBlock";
import { BackArrow } from "../components/BackArrow";

function Cook() {
  const { orders, fetchOrders } = useContext(orderContext);
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-[var(--primary-color)] h-screen text-white ">
      <BackArrow data={""} />
      <h1 className="flex justify-center items-center mt-10 text-3xl">Cook</h1>
      {orders != {} && <OrdersBlock />}
    </div>
  );
}

export default Cook;
