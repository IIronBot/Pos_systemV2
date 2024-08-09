import React from "react";
import "../index.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { MenuItem } from "../components/MenuItem";
import { menuContext } from "../context/exportContext";
import { orderContext } from "../context/exportContext";
import { BackArrow } from "../components/BackArrow";
import { NoteEditor } from "../components/NoteEditor";

export const CreateOrder = () => {
  const {
    buildOrderData,
    postOrder,
    orderNum,
    setOrderNum,
    orders,
    noteValue,
    setNoteValue,
  } = useContext(orderContext);
  const { menuData, getDefaultCart, cartItems, setNoteRender } =
    useContext(menuContext);

  const [filter, setFilter] = useState();

  let menuItemList = [];
  useEffect(() => {
    // console.dir(getMenu())
    if (!menuData) return;
    for (let i = 0; i < menuData.length; i++) {
      if (menuData[i]) {
        menuItemList.push(<MenuItem key={i} data={[menuData[i], filter]} />);
      }
    }
  }, [menuData]);

  const renderMenuItems = useCallback(() => {
    // console.dir(cartItems);
    console.log("render");
    menuItemList = [];
    if (!menuData) return;
    for (let i = 0; i < menuData.length; i++) {
      menuItemList.push(<MenuItem key={i} data={[menuData[i], filter]} />);
    }
    return menuItemList;
  }, [menuData, filter]);

  useEffect(() => {
    setOrderNum(orders[orders.length - 1].ordernum + 1);
    setFilter("all");
  }, []);
  const filterButtonStyle =
    "mx-[10px] list-none shadow rounded border border-black bg-white text-black py-[8px] px-[10px] pointer max-h-[40px] text-sm hover:bg-[color:var(--secondary-color)] hover:scale-125 transition-all ease-in";

  const filterOptions = [
    "Wings",
    "Quesadillas",
    "Topping",
    "Wraps",
    "Specialties",
    "Sandwiches",
  ];
  return (
    <div className="bg-[var:color(--primary-color)] text-white h-fit">
      <h1 className="text-center py-[35px]">Create Order</h1>
      <BackArrow data={"cashier"} />
      <NoteEditor />
      <ul className="flex flex-wrap justify-center w-full pointer">
        {filterOptions.map((item, index) => {
          return (
            <li key={index} className={filterButtonStyle}>
              <button onClick={() => setFilter(item)}>{item}</button>
            </li>
          );
        })}
        {/* <li className='Wings' ><button onClick={() => getDefaultCart()}>getDefaultCart</button></li> */}
        <li>
          <button onClick={() => console.log(cartItems)}>cartItems</button>
        </li>
        <li>
          <button
            className={filterButtonStyle}
            onClick={() => setFilter("all")}
          >
            All
          </button>
        </li>

        <li className={filterButtonStyle}>
          <button
            onClick={() => {
              setOrderNum(orders[orders.length - 1].ordernum + 1);
              postOrder(buildOrderData(menuData, orderNum, noteValue));
              setNoteRender(false);
              setNoteValue(null);
            }}
          >
            Create Order
          </button>
        </li>
      </ul>
      <div className="flex flex-wrap h-fit mt-[20px] mb-[50px] ">
        {menuData && renderMenuItems()}
        <div></div>
      </div>
    </div>
  );
};
