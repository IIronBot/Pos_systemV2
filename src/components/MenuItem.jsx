import React from "react";
import { menuContext } from "../context/exportContext";
import { useContext, useEffect, useState } from "react";

export const MenuItem = (prop) => {
  const [render, setRender] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const { cartItems, updateCart, addToCart, removeFromCart } =
    useContext(menuContext);
  const { name, price, id, category } = prop.data[0];

  const filter = prop.data[1];
  useEffect(() => {
    console.log(filter);
    if (filter == "all") {
      setRender(true);
      return;
    }
    if (category == filter) {
      setRender(true);
    } else {
      setRender(false);
    }
  }, [filter]);

  useEffect(() => {
    updateCart(inputValue, id);
  }, [inputValue]);

  return (
    <>
      {render && (
        <div className="flex flex-col items-center justify-center w-[150px] h-[150px] m-[25px] border border-black text-black bg-white rounded">
          <p className="w-auto text-center">{name}</p>
          <p>
            ${price}
            {price > 1 && ".00"}
          </p>
          {/* <p>{Count}</p> */}
          <div className="flex">
            <button
              onClick={() => {
                removeFromCart(id);
              }}
            >
              -
            </button>
            {/* <p className="count">{ cartItems[id] && cartItems[id]}</p> */}

            <input
              value={cartItems[id]}
              className="mt-[4px] pl-[10px] w-[30px] h-[15px] outline-none"
              inputMode="numeric"
              type="number"
              onChange={(e) => {
                if (isNaN(parseInt(e.target.value))) {
                  setInputValue(0);
                } else {
                  setInputValue(parseInt(e.target.value));
                }
              }}
            />
            <button
              onClick={() => {
                addToCart(id);
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
};
