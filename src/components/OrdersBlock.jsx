import React from "react";
import { useContext, useEffect, useState } from "react";
import { menuContext, orderContext } from "../context/exportContext";
import { Order } from "./Order";

function OrdersBlock() {
  const [render, setRender] = useState(false);
  const { orders } = useContext(orderContext);
  const { menuData } = useContext(menuContext);

  useEffect(() => {
    if (!orders || !menuData) return;
    setRender(true);
  }, [orders, menuData]);

  return (
    <div className="ordersBlockParent">
      <h2 className="text-center mt-[40px] mb-4">Current Orders</h2>
      <div>
        <ul className="flex flex-col-reverse absolute right-[12%] w-3/4 list-none">
          {render &&
            orders.map((item, index) => {
              if (item.status == "Complete") return;
              return (
                <li key={index}>
                  <Order data={[item, menuData]} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default OrdersBlock;
