import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  removeItem,
  IncreaseItemQty,
  DecreaseItemQty,
} from "../ReduxApi/AddToCart";
import { ShoppingCartOutlined, TruckOutlined } from "@ant-design/icons";
import { json, useNavigate } from "react-router-dom";
import { DecCartItems, DeleteCartItems, IncCartItems } from "../apis/Api";
import { products } from "../ProductsData";
import { message } from "antd";
const Cart = () => {
  const carts = useSelector((state) => state.cart.cart);
  console.log("cart", carts);
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(carts);
  const totalItems = useSelector((state) => state.cart.cartItem);
  const totalCartPrice = useSelector((state) => state.cart.cartPrice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [carts, setcarts] = useState(rawcarts);
  // useEffect(() => {}, [carts]);
  async function removeitemfromcart(_id) {
    const userdata = {
      productId: _id,
      user: auth.currentUser,
    };
    try {
      const res = await DeleteCartItems(userdata, auth.token);
      const data = await res.json();
      message.open({
        type: "success",
        content: "Remove from cart successfully",
      });
      console.log("hj", data);
      dispatch(removeItem(data));
    } catch (error) {
      console.log(error);
    }
  }

  async function Increaseitemqty(_id) {
    const userdata = {
      productId: _id,
      user: auth.currentUser,
    };
    try {
      const res = await IncCartItems(userdata, auth.token);
      const data = await res.json();
      console.log("inc", data);
      dispatch(IncreaseItemQty(data));
    } catch (error) {
      console.log(error);
    }
  }

  async function Decreaseitemqty(_id) {
    const userdata = {
      productId: _id,
      user: auth.currentUser,
    };
    try {
      const res = await DecCartItems(userdata, auth.token);
      const data = await res.json();
      console.log("dec", data);
      dispatch(DecreaseItemQty(data));
      // dispatch(IncreaseItemQty(data));
    } catch (error) {
      console.log(error);
    }
  }
  // var cartempty = carts?.items ? false : true;
  // var cartsss =
  // var cartempty = cart
  return (
    <>
      <section className=" px-3 min-h-[80vh] py-7 lg:py-0 sm:px-6 lg:flex gap-12 ">
        {carts?.items?.length === 0 ? (
          <div className=" h-[79vh] w-full flex justify-center items-center">
            <div className=" flex flex-col justify-center items-center">
              <ShoppingCartOutlined
                className="  text-red-500"
                style={{ fontSize: "80px" }}
              />
              <b className=" font-semibold text-2xl">Your Cart Is Empty</b>
              <p className=" font-normal text-gray-500">
                There is nothing in your bag. Let’s add some items.
              </p>
              <button
                onClick={() => navigate("/store")}
                className=" uppercase bg-red-600 h-12 text-white px-6 text-[16px] mt-5 rounded-md"
              >
                Start shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className=" lg:w-[70%] md:py-6">
              {totalCartPrice >= 1500 && (
                <div className="lg:py-3 py-2 border rounded-md text-[16px] mb-4 flex items-center px-2 ">
                  <TruckOutlined
                    style={{ fontSize: "25px" }}
                    className="mx-1"
                  />
                  Hurray!{" "}
                  <span className="  text-[14px] flex items-center font-semibold text-red-400 mx-1">
                    Free Delivery!
                  </span>
                  on this order.
                </div>
              )}
              <div className=" flex text-[15px] sm:text-[18px] justify-between mb-4">
                <p className="text-[15px] sm:text-[18px]">
                  Shopping Cart ({totalItems} Items)
                </p>
                <p className="text-[15px] sm:text-[18px]">
                  Total : ₹{totalCartPrice}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {
                  // console.log(carts)
                  carts.items?.map((products) => {
                    console.log("hii", products);
                    return (
                      <div>
                        <div className=" shadow hover:shadow-lg rounded-sm  flex items-center p-2 ">
                          <img
                            className="h-[70px] sm:h-28"
                            src={products.product.images[0]}
                            alt=""
                          />
                          <div className=" w-full">
                            <div className=" flex sm:pt-3 pr-2 gap-2 justify-between">
                              <p className=" text-[13px] sm:text-[16px] leading-tight ">
                                {products.product.name}
                              </p>
                              <p className=" text-[13px]  text-center  sm:text-[16px]">
                                ₹{products.product.price * products.quantity}
                              </p>
                            </div>
                            <p className=" text-[10px]  sm:m-0 sm:text-[12px] text-gray-400">
                              Model : {products.product.modelno}
                            </p>
                            <div className=" mt-2 flex justify-between items-center">
                              <div className=" flex gap-1">
                                <div
                                  onClick={() =>
                                    Decreaseitemqty(products.product._id)
                                  }
                                  className=" cursor-pointer bg-gray-200 h-5 md:h-7 w-5 md:w-7 rounded-sm flex items-center justify-center text-xl"
                                >
                                  -
                                </div>
                                <div className=" w-8 text-center text-[14px] md:text-[18px]">
                                  {products.quantity}
                                </div>
                                <div
                                  onClick={() =>
                                    Increaseitemqty(products.product._id)
                                  }
                                  className=" cursor-pointer bg-gray-200 h-5 md:h-7 w-5 md:w-7 rounded-sm flex items-center justify-center text-[16px] md:text-[20px] "
                                >
                                  +
                                </div>
                              </div>
                              <p className=" text-[14px]  sm:text-[18px] cursor-pointer pb-[-2px] sm:pb-[5px] ">
                                <span
                                  onClick={() =>
                                    removeitemfromcart(products.product._id)
                                  }
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  Remove
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <div className=" lg:w-[30%] lg:border-l-2 lg:px-6 lg:py-6 flex flex-col gap-3 mt-4 md:mt-0">
              <div className=" flex flex-col gap-2">
                <p className=" font-semibold lg:mb-3 text-[16px] sm:text-[18px]">
                  Price Detail
                </p>
                <div className=" text-[13px] sm:text-[15px] flex justify-between">
                  <p>Total MRP</p>
                  <p>₹{totalCartPrice}</p>
                </div>{" "}
                <div className=" text-[13px] sm:text-[15px] flex justify-between">
                  <p>Delivery</p>

                  {totalCartPrice <= 1499 ? (
                    <p>₹100</p>
                  ) : (
                    <p>
                      <span className=" line-through">₹100</span>{" "}
                      <span className=" text-red-500">Free Delivery</span>
                    </p>
                  )}
                </div>
              </div>
              {totalCartPrice <= 1500 && (
                <div className="py-3 text-[16px] flex items-center border-t-[7px] border-b-[7px] font-semibold">
                  <TruckOutlined
                    style={{ fontSize: "25px" }}
                    className="mx-1"
                  />
                  Free Delivery{" "}
                  <span className="  text-[14px] mt-[5px] ml-1 font-normal">
                    Shop for more ₹
                    {totalCartPrice >= 1500 ? "" : 1500 - totalCartPrice}
                  </span>
                </div>
              )}

              <div
                className={` ${
                  totalCartPrice <= 1500 ? " mt-[-8px]" : "border-t-2"
                } py-3 pb-6 flex flex-col  items-center text-[18px] justify-between border-b-2`}
              >
                <div className=" flex  justify-between items-center w-full mb-3 lg:mb-4">
                  <p className="text-[13px] lg:text-[18px] ">Total Amount</p>
                  <p className="font-semibold">
                    {" "}
                    ₹
                    {totalCartPrice < 1500
                      ? totalCartPrice + 100
                      : totalCartPrice}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className=" w-full border py-2 rounded-md bg-orange-600 hover:bg-orange-700 transition-all duration-100 ease-linear text-white tracking-wider"
                >
                  Checkout
                </button>
              </div>
              {/* <div className=" mb-3">Shipping & Refund Policy</div> */}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
