import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { totalItems } from "../ReduxApi/AddToCart";
import {
  totalPrice,
  removeItem,
  IncreaseItemQty,
  DecreaseItemQty,
} from "../ReduxApi/AddToCart";
import {
  EditOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CheckOut = () => {
  const [AddressHide, setAddressHide] = useState(false);
  const [ItemsHide, setItemsHide] = useState(false);
  const carts = useSelector((state) => state.cart.cart);
  const auth = useSelector((state) => state.auth);

  const totalItems = useSelector((state) => state.cart.cartItem);
  const totalCartPrice = useSelector((state) => state.cart.cartPrice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async (amount) => {
    try {
      // Load Razorpay script dynamically
      //   await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      //   const amount = 500;
      console.log("jidf", amount * 100);
      // Make API call to initiate payment
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            // Include any necessary data for creating the order
          }),
        }
      );
      // const dataa =await response.json()
      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }
      //   const { orderId } = await response.json();

      // Initialize Razorpay
      const razorpayOptions = {
        key: "rzp_test_raNMlh9GYX3QXF", // Replace with your Razorpay Key ID
        amount: amount * 500, // Example: 100 (amount in paisa)
        currency: "INR", // Example: 'INR'
        name: "GoodTimes",
        description: "Payment for your order",
        order_id: response.id,
        callback_url: "/verify-order",

        prefill: {
          name: auth.currentUser.name,
          email: auth.currentUser.email,
          contact: auth.currentUser.phone,
        },
      };
      console.log("razorpayOptions", razorpayOptions);
      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  return (
    <>
      <section className=" px-3 min-h-[80vh] py-7 lg:py-0 sm:px-6 lg:flex gap-12 ">
        {totalCartPrice === 0 ? (
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
              {/* {totalCartPrice >= 1500 && (
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
              )} */}
              {/* <div className=" flex text-[15px] sm:text-[18px] justify-between mb-4">
                <p className="text-[15px] sm:text-[18px]">
                  Shopping Cart ({totalItems} Items)
                </p>
                <p className="text-[15px] sm:text-[18px]">
                  Total : ₹{totalCartPrice}
                </p>
              </div> */}
              <div className=" overflow-hidden rounded-md border shadow-md">
                <div
                  onClick={() => setAddressHide(!AddressHide)}
                  className=" p-5 flex border justify-between items-center"
                >
                  <b className=" uppercase tracking-widest flex gap-3 justify-center items-center">
                    <div className=" rounded-full h-5 w-5 flex justify-center items-center text-[12px] bg-black text-white">
                      1
                    </div>{" "}
                    Delivery address
                  </b>
                </div>

                <p
                  className={`${AddressHide ? "hidden" : ""} p-5 bg-slate-100`}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Sequi temporibus accusantium quaerat repellendus voluptatibus
                  debitis. Quaerat harum enim, atque aut veniam aspernatur quam
                  illum necessitatibus!
                </p>
              </div>

              <div className=" overflow-hidden mt-4 rounded-md border shadow-md">
                <div
                  onClick={() => setItemsHide(!ItemsHide)}
                  className=" p-5 flex border justify-between items-center"
                >
                  <b className=" uppercase tracking-widest flex gap-3 justify-center items-center">
                    <div className=" rounded-full h-5 w-5 flex justify-center items-center text-[12px] bg-black text-white">
                      2
                    </div>{" "}
                    Order summery
                  </b>{" "}
                  <p className="text-[14px] text-gray-500 font-medium sm:text-[16px]">
                    <span>(</span> {totalItems} Items <span>)</span>
                  </p>
                </div>

                <div
                  className={`${ItemsHide ? "hidden" : ""} p-5 bg-slate-100`}
                >
                  <div className="flex flex-col gap-2">
                    {
                      // console.log(carts)
                      carts.items.map((products) => {
                        console.log("hii", products);
                        return (
                          <div>
                            <div className=" bg-white border rounded-md  flex items-center p-2 ">
                              <img
                                className="h-[70px] sm:h-24"
                                src={products.product.images[0]}
                                alt=""
                              />
                              <div className=" w-full">
                                <div className=" flex sm:pt-3 pr-2 gap-2 justify-between">
                                  <p className=" text-[13px] sm:text-[16px] leading-tight ">
                                    {products.product.name}
                                  </p>
                                  <p className=" text-[13px]  text-center  sm:text-[16px]">
                                    ₹
                                    {products.product.price * products.quantity}
                                  </p>
                                </div>
                                <p className=" text-[10px]  sm:m-0 sm:text-[12px] text-gray-400">
                                  Model : {products.product.modelno}
                                </p>
                                <div className=" mt-2 flex justify-between items-center">
                                  <div className=" flex justify-center items-center gap-1">
                                    <div className="  font-normal text-[14px] md:text-[17px]">
                                      Quantity
                                    </div>
                                    <div className=" text-center text-[14px] md:text-[17px]">
                                      {products.quantity}
                                    </div>
                                    {/* <div
                                  onClick={() => Increaseitemqty(products._id)}
                                  className=" cursor-pointer bg-gray-200 h-5 md:h-7 w-5 md:w-7 rounded-sm flex items-center justify-center text-[16px] md:text-[20px] "
                                >
                                  +
                                </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
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
                  onClick={() => handlePayment(500)}
                  className=" w-full border py-2 rounded-md bg-orange-600 hover:bg-orange-700 transition-all duration-100 ease-linear text-white tracking-wider"
                >
                  Payment
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

export default CheckOut;
