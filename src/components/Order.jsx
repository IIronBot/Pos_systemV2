import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { orderContext } from "../context/exportContext";
const statusOptions = ["Not Started", "Cooking", "Ready To Serve", "Complete"];

export function Order(prop) {
  const [localOrderData, localMenuData] = prop.data;

  const orderItemInfo = localOrderData.ids.split(",");
  const [orderValue, setOrderValue] = useState("");

  const [renderstatus, setRenderStatus] = useState(false);
  const { updateOrderStatus, status, deleteOrder } = useContext(orderContext);
  const [localStatus, setLocalStatus] = useState(localOrderData?.status);

  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const statusRef = useRef(null);
  const orderRef = useRef(null);
  let statusElement = statusRef.current;

  const toggleDropDown = () => {
    statusElement = statusRef.current;
    if (statusElement.className.includes("opacity-0")) {
      console.log("added: " + statusElement.classList[0]);
      statusElement.classList.replace("invisible", "visible");
      statusElement.classList.replace("opacity-0", "opacity-100");
      statusElement.classList.replace("cursor-default", "cursor-pointer");

      console.log(statusElement.classList);
    } else {
      console.log("not added");
      console.log(statusElement.className);
      statusElement.classList.replace("opacity-100", "opacity-0");
      statusElement.classList.replace("visible", "invisible");
      statusElement.classList.replace("cursor-pointer", "cursor-default");
      console.log(statusElement.classList);
    }
  };

  useEffect(() => {
    console.log("mounted");
    console.log(localOrderData);
  }, []);

  // adds items totals
  useEffect(() => {
    if (!localOrderData || !localMenuData) return;
    var tempVal = 0;
    orderItemInfo.map((orderItemIds) => {
      var orderItemId = orderItemIds.split(":")[1];

      if (localMenuData[orderItemId])
        tempVal += localMenuData[orderItemId].price;
    });
    setOrderValue(tempVal);
  }, [localOrderData]);

  //sets Status when component renders
  useEffect(() => {
    if (!status) {
      setRenderStatus(true);
    }
    setLocalStatus(localOrderData?.status);
  }, [localOrderData]);

  // update status in database when status is changed
  useEffect(() => {
    if (!localStatus || !localOrderData.ordernum) return;

    updateOrderStatus(localOrderData.id, localStatus);
    if (localStatus == "Complete" && orderRef.current !== undefined) {
      orderRef.current.classList.add("translate-y[-1000px]");
      setTimeout(() => {
        orderRef.current?.classList.remove("translate-y-[-1000px]");
        orderRef.current?.classList.add("hidden");
        deleteOrder(localOrderData.ordernum.toString());
        console.log("hidden");
      }, 1000);
    }
    if (!statusElement) return;
    statusElement.classList.remove(
      "opacity-100.bottom-[20px].my-[10px].h-auto"
    );
    console.log("removed");
  }, [localStatus, orderRef]);

  return (
    <div
      className="h-auto w-full h-min-[100px] border-[1px] border-white flex py-[20px] px-[10px] transition-all ease-in "
      ref={orderRef}
    >
      {/* <div className='order'> */}
      <div className="w-1/3">
        <p className="my-[10px] text-center">Notes</p>
        {localOrderData?.notes ? (
          localOrderData?.notes
        ) : (
          <p className="flex justify-center items-center">__________</p>
        )}
      </div>
      <div className="w-1/3">
        <p className="my-[10px] text-center">
          Order Number: {localOrderData && localOrderData.ordernum}
        </p>
        {localOrderData &&
          orderItemInfo.map((orderItemIds, index) => {
            if (orderItemIds === undefined) return;
            var count = orderItemIds.split(":")[0];
            var orderItemId = orderItemIds.split(":")[1];

            try {
              return (
                <div key={index} className="flex justify-around w-full ">
                  <p>
                    {`(${count})`} {localMenuData[orderItemId].name}{" "}
                  </p>
                </div>
              );
            } catch {
              (err) => console.log(err);
            }
          })}
      </div>
      <div className="w-1/3">
        <p className="my-[10px] text-center">
          Total: ${orderValue && orderValue}
        </p>
        <p
          className="mt-[10px] mb-[20px] text-center cursor-pointer"
          onClick={() => {
            setShowStatusOptions(!showStatusOptions);
            toggleDropDown();
          }}
        >
          Status: {renderstatus && localStatus}
        </p>
        <ul
          ref={statusRef}
          className="opacity-0 transition-all ease relative bottom-[20px] h-0 list-none cursor-default"
        >
          {statusOptions.map((item, index) => {
            return (
              <li
                className="my-[10px] z-10"
                key={index}
                onClick={() => {
                  if (showStatusOptions) {
                    setLocalStatus(item);
                    setShowStatusOptions(false);
                    toggleDropDown();
                  }
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <p
        className="h-[20px] relative top-[10px] right-[10px] cursor-pointer text-center"
        onClick={() => deleteOrder(localOrderData.ordernum.toString())}
      >
        X
      </p>
    </div>
  );
}

export default Order;
