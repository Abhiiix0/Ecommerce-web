import React from "react";
import { Modal } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const OrderDetails = ({ open, sethide, data }) => {
  console.log(data);
  return (
    <div>
      <Modal footer={false} open={open} onCancel={() => sethide(false)}>
        <div className=" bg-slate-100 p-2 rounded-md my-6 flex flex-col gap-1">
          <div className=" bg-slate-100">
            <p>
              {" "}
              <span className=" font-medium">ID </span>: {data?._id}
            </p>
          </div>
          <div className=" bg-slate-100">
            <p></p>
            <p>
              <span className=" font-medium">STATUS</span>: {data?.orderStatus}
            </p>
          </div>
          <div className=" bg-slate-100">
            <p></p>
            <p className=" flex gap-1">
              <span className=" font-medium">PAYMENT</span>:{" "}
              {data?.paymentDone ? (
                <p className=" bg-green-700 w-5 h-5 p-3 grid place-content-center rounded-full">
                  {" "}
                  <CheckOutlined style={{ color: "white" }} />{" "}
                </p>
              ) : (
                <p className=" bg-red-700 w-4 h-4 grid place-content-center rounded-full">
                  <CloseOutlined style={{ color: "white" }} />
                </p>
              )}
            </p>
          </div>
          <div className=" bg-slate-100">
            <p>
              {" "}
              <span className=" font-medium">AMOUNT </span>: {data?.totalAmount}
            </p>
          </div>
          <div className=" bg-slate-100">
            <p></p>
            <p>
              {" "}
              <span className=" font-medium">ADDRESS</span>: {data?.userAddress}
            </p>
          </div>
          <div className=" bg-slate-100 ">
            <div className=" bg-slate-500 flex text-white mb-2 items-center justify-between p-2 gap-2">
              <p>img</p>
              {/* <p>Name</p> */}
              <p>Quantity</p>
              <p>Price</p>
            </div>
            <div className="flex h-[330px] overflow-scroll flex-col gap-2">
              {data?.items.map((p) => (
                <NavLink
                  to={`/products/${p?.product.slug}`}
                  className=" flex rounded-md items-center justify-between p-2 gap-2 bg-white"
                >
                  <img className="h-8 w-8" src={p?.product.images[0]} alt="" />
                  {/* <p className=" w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {p.product.name}
                </p> */}
                  <p>{p.quantity}</p>
                  <p>{p.price}</p>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetails;
