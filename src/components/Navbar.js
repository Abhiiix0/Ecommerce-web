import React from "react";
import { useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Headroom from "react-headroom";
import { Modal, Button, Drawer, Badge, message } from "antd";
import HttpsIcon from "@mui/icons-material/Https";
// import { Footer } from "antd/es/layout/layout";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import { useSelector, useDispatch } from "react-redux";
import { totalItems } from "../ReduxApi/AddToCart";
const Navbar = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { register, handleSubmit, reset } = useForm();
  const cartItemssss = useSelector((state) => state.cart);
  console.log(cartItemssss);
  const [hides, sethides] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [LR, setLR] = useState(true);
  const [showPass, setshowPass] = useState(false);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItem);
  console.log(cartItem);
  function totalcart() {
    dispatch(totalItems());
  }

  useEffect(() => {
    totalcart();
  }, [cartItemssss]);

  // useEffect(() => {
  //   window.addEventListener("scroll", stickNavbar);
  //   return () => window.removeEventListener("scroll", stickNavbar);
  // }, []);

  // const stickNavbar = () => {
  //   if (window !== undefined) {
  //     let windowHeight = window.scrollY;
  //     // window height changed for the demo
  //     windowHeight > 25 ? setStickyClass(true) : setStickyClass(false);
  //   }
  // };

  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const onRegistersubmit = async (value) => {
    try {
      const response = await fetch(
        "https://finalyeartyproject-production.up.railway.app/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success === true) {
        messageApi.open({
          type: "success",
          content: data.message,
        });
        console.log(data);
      }
      if (data.success === false) {
        messageApi.open({
          type: "error",
          content: data.message,
        });
        console.log(data);
      }
      // if (data.success) {
      //   setInterval(() => {
      //     setLR(true);
      //     reset();
      //     // setLR(!LR);
      //     setshowPass(false);
      //   }, 2000);
      // }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
    // console.log(value);
  };
  const onLoginsubmit = async (value) => {
    try {
      const response = await fetch(
        "https://finalyeartyproject-production.up.railway.app/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // if (data.success) {
      //   setInterval(() => {
      //     setLR(true);
      //     reset();
      //     // setLR(!LR);
      //     setshowPass(false);
      //   }, 2000);
      // }

      if (data.success === true) {
        messageApi.open({
          type: "success",
          content: data.message,
        });
        console.log(data);
      }
      if (data.success === false) {
        messageApi.open({
          type: "error",
          content: data.message,
        });
      }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
    // console.log(value);
  };
  const disableScroll = () => {
    // Get the current page scroll position
    // if any scroll is attempted,
    // set this to the previous value
    // console.log("fun");
    if (hides === true) {
      let scrollTop = document.documentElement.scrollTop;
      let scrollLeft = document.documentElement.scrollLeft;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
        // console.log("stop");
      };
    } else {
      window.onscroll = function () {
        // window.scrollTo(scrollLeft, scrollTop);
        // console.log("stop");
      };
    }
  };

  return (
    <>
      {contextHolder}
      <section className="relative">
        <header
          // style={{ display: stickyclass ? "none" : "" }}
          className=" hidden text-center lg:flex items-center justify-end pr-5 h-7 text-[12px] border-b-2 border-gray-300"
        >
          <ul className="flex items-center tracking-wider justify-between w-fit ">
            <li className=" px-3">Track Order</li>
            <li className=" border-l-2  px-3">Store Locator</li>
            <li className=" border-l-2 border-r-2 px-3">
              {" "}
              <NavLink to="/contact">Contact Us</NavLink>{" "}
            </li>
            <li className="  px-3" onClick={() => setisopen(!isopen)}>
              Login
            </li>
            <Modal
              width={350}
              open={isopen}
              footer={null}
              onCancel={() => setisopen(false)}
            >
              <div className=" py-6">
                <p className=" text-2xl mb-4 font-semibold text-blue-500 text-center">
                  {LR ? "login " : "Register"}
                </p>
                {LR ? (
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit(onLoginsubmit)}
                    className=" flex flex-col gap-5"
                  >
                    <div className=" border flex justify-center rounded-md overflow-hidden items-center h-10">
                      <label
                        htmlFor="email"
                        className=" px-2 h-full grid place-content-center bg-slate-300"
                      >
                        <EmailIcon className=" " />
                      </label>
                      <input
                        className="outline-none border w-full h-full px-3"
                        type="text"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                    </div>

                    <div className=" border flex  justify-center rounded-md overflow-hidden items-center h-10">
                      <label
                        htmlFor="password"
                        className=" px-2 h-full grid place-content-center bg-slate-300"
                      >
                        {" "}
                        <HttpsIcon h className=" " />
                      </label>
                      <input
                        name="password"
                        className=" border outline-none w-full h-full px-3"
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                    </div>

                    <div className=" flex justify-between overflow-hidden">
                      <div className=" gap-1 flex items-center">
                        <input
                          type="checkbox"
                          name="showP"
                          id="showP"
                          value="show"
                          onChange={() => setshowPass(!showPass)}
                        />
                        {/* <input type="" name="" id="" /> */}
                        <label htmlFor="showP">Show Password</label>
                      </div>
                      <p>Forget Password?</p>
                    </div>

                    <button
                      type="submit"
                      className=" w-full rounded-md bg-blue-500 text-white font-semibold h-10 text-[16px]"
                    >
                      Log in
                    </button>
                    <p className=" text-center">
                      Dont Have An Account?
                      <span
                        className="  text-blue-500 cursor-pointer"
                        onClick={() => {
                          reset();
                          setLR(!LR);
                          setshowPass(false);
                        }}
                      >
                        {" "}
                        Sign Up
                      </span>{" "}
                    </p>
                  </form>
                ) : (
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit(onRegistersubmit)}
                    className=" flex flex-col gap-5"
                  >
                    <div className=" border flex justify-center rounded-md overflow-hidden items-center h-10">
                      <label
                        htmlFor="name"
                        className=" px-2 h-full grid place-content-center bg-slate-300"
                      >
                        {" "}
                        <PersonIcon className=" " />
                      </label>
                      <input
                        className="outline-none border w-full h-full px-3"
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        {...register("name", {
                          required: "Username is required",
                        })}
                      />
                    </div>
                    <div className=" border flex justify-center rounded-md overflow-hidden items-center h-10">
                      <label
                        htmlFor="email"
                        className=" px-2 h-full grid place-content-center bg-slate-300"
                      >
                        {" "}
                        <EmailIcon h className=" " />
                      </label>
                      <input
                        className="outline-none border w-full h-full px-3"
                        type="mail"
                        placeholder="Email"
                        {...register("email", {
                          required: "email is required",
                        })}
                      />
                    </div>

                    <div className=" border flex justify-center rounded-md overflow-hidden items-center h-10">
                      <label
                        htmlFor="email"
                        className=" px-2 h-full grid place-content-center bg-slate-300"
                      >
                        {" "}
                        <PhoneIphoneIcon className=" " />
                      </label>
                      <input
                        className="outline-none border w-full h-full px-3"
                        type="number"
                        placeholder="Phone Number"
                        {...register("phone", {
                          required: "Number is required",
                        })}
                      />
                    </div>
                    <div className=" border flex justify-center rounded-md overflow-hidden items-center h-10">
                      <label
                        htmlFor="email"
                        className=" px-2 h-full grid place-content-center bg-slate-300"
                      >
                        {" "}
                        <HttpsIcon h className=" " />
                      </label>
                      <input
                        className=" border outline-none w-full h-full px-3"
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                    </div>
                    <div className=" flex justify-between">
                      <div className=" gap-1 flex items-center">
                        <input
                          type="checkbox"
                          name="showP"
                          id="showP"
                          value="show"
                          onChange={() => setshowPass(!showPass)}
                        />
                        {/* <input type="" name="" id="" /> */}
                        <label htmlFor="showP">Show Password</label>
                      </div>
                      <p>Forget Password?</p>
                    </div>
                    <button
                      type="submit"
                      className=" rounded-md tracking-widest w-full bg-blue-500 text-white font-semibold h-10 text-[16px]"
                    >
                      Register
                    </button>
                    <p className=" text-center">
                      Already Have An Account?
                      <span
                        className="  text-blue-500 cursor-pointer"
                        onClick={() => {
                          reset();
                          setLR(!LR);
                          setshowPass(false);
                        }}
                      >
                        {" "}
                        Login
                      </span>{" "}
                    </p>
                  </form>
                )}
              </div>
            </Modal>
          </ul>
        </header>
        <Headroom>
          <nav
            // style={{ position: "fixed", top: stickyclass ? "0px" : "28[" }}
            // style={{ position: stickyclass ? "fixed" : " " }}
            className="  bg-white h-[70px] z-50  shadow-md lg:shadow-[0] lg:border-b-2 border-gray-300 lg:h-[94px] w-full flex items-center justify-between px-2 lg:px-8"
          >
            <div className=" flex justify-between items-center w-full">
              <span className="flex items-center gap-1">
                <span
                  className=" block lg:hidden cursor-pointer "
                  onClick={() => {
                    sethides(!hides);
                    disableScroll();
                  }}
                >
                  <MenuIcon id="menu" />
                </span>
                <NavLink to="/">
                  <img
                    src={require("../img/goodtimesBlackVersion.jpeg")}
                    className=" h-[52px] rounded-md hidden lg:block"
                    alt=""
                  />
                  <img
                    src={require("../img/goodtimesBlackVersion.jpeg")}
                    className=" h-[35px] rounded-md block lg:hidden"
                    alt=""
                  />
                </NavLink>
              </span>

              <ul className=" flex  items-center gap-2 mr-5 lg:mr-0 lg:gap-5">
                <li className=" hidden lg:block">
                  <NavLink
                    to="/store"
                    className=" text-sm font-medium text-gray-600 transition-all duration-100 ease-linear border-orange-400 pb-2 w-fit px-1 hover:border-b-2"
                  >
                    ANALOG
                  </NavLink>
                </li>
                <li className=" hidden lg:block">
                  <a
                    href="#"
                    className=" text-sm font-medium text-gray-600 transition-all duration-100 ease-linear border-orange-400 pb-2 w-fit px-1 hover:border-b-2"
                  >
                    DIGITAL
                  </a>
                </li>
                <li className=" hidden lg:block">
                  <a
                    href="#"
                    className=" text-sm font-medium text-gray-600 transition-all duration-100 ease-linear border-orange-400 pb-2 w-fit px-1 hover:border-b-2"
                  >
                    SMARTWATCHS
                  </a>
                </li>
                <li className=" hidden lg:block">
                  <a
                    href="#"
                    className=" text-sm font-medium text-gray-600 transition-all duration-100 ease-linear border-orange-400 pb-2 w-fit px-1 hover:border-b-2"
                  >
                    WATCH FINDER
                  </a>
                </li>
                <li>
                  <div className=" bg-slate-100 border h-[44px] w-60  items-center px-4 gap-3 rounded-md hidden lg:flex">
                    <SearchOutlinedIcon className=" text-black" />
                    <input
                      type="text"
                      placeholder="Search for products"
                      className=" bg-transparent outline-0 "
                    />
                  </div>
                </li>
                <li>
                  <a href="#" className=" h-[25px] w-[30px]">
                    <FavoriteBorderOutlinedIcon id="heart" s />
                  </a>
                </li>
                <li>
                  <a href="#" className=" relative  ">
                    <Badge
                      count={cartItem}
                      size="small"
                      className=" absolute p-0 top-0 right-0 h-2 text-[10px]  mr-[-10px] mt-[-5px]"
                    ></Badge>
                    <ShoppingBagOutlinedIcon id="bag" />
                  </a>
                </li>
              </ul>
            </div>
            <Drawer
              open={hides}
              // header={false}
              extra="Store"
              className=" m-0 p-0"
              // placement="left"
              onClick={() => sethides(false)}
            >
              <div
                className="bg-white  m-0 lg:hidden"
                // style={{ display: hides ? "none" : "" }}
              >
                <ul className="bg-white">
                  <li className=" border-b-[2px] font-semibold text-[16px] py-4">
                    <NavLink to="/store">T-shirt</NavLink>
                  </li>
                  <li className=" border-b-[2px] font-semibold text-[16px] py-4">
                    <a href="#">Shirts</a>
                  </li>
                  <li className=" border-b-[2px] font-semibold text-[16px] py-4">
                    <a href="#">Bottoms</a>
                  </li>
                  <li className=" border-b-[2px] font-semibold text-[16px] py-4">
                    <a href="#">Jackets</a>
                  </li>
                </ul>
                <ul className=" px-2 flex flex-col gap-5 h-fit py-6 bg-slate-200">
                  <li className=" font-normal text-[16px]">
                    <p
                      onClick={() => {
                        setisopen(!isopen);
                        sethides(false);
                      }}
                    >
                      Login
                    </p>
                  </li>
                  <li className=" font-normal text-[16px] ">
                    <a href="#">Track Order</a>
                  </li>
                  <li className=" font-normal text-[16px] ">
                    <a href="#">Store Locator</a>
                  </li>
                  <li className=" font-normal text-[16px]">
                    <NavLink to="/contact">Contact Us</NavLink>
                  </li>
                </ul>
              </div>
            </Drawer>
          </nav>
        </Headroom>
      </section>
    </>
  );
};

export default Navbar;
