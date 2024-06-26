import React from "react";
import { useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Headroom from "react-headroom";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import { Modal, Button, Drawer, Badge, message, Dropdown } from "antd";
import HttpsIcon from "@mui/icons-material/Https";
// import { Footer } from "antd/es/layout/layout";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import { useSelector, useDispatch } from "react-redux";
import { CartSet, logoutCart, totalItems } from "../ReduxApi/AddToCart";
import { logout } from "../ReduxApi/authSlice";
// import { useDispatch } from "react-redux";
import { setCurrentUser } from "../ReduxApi/authSlice";
import { getSearchProducts, loginAPi, RegisterAPi } from "../apis/Api";
import ForgetPassword from "./ForgetPassword";
import SrchModal from "./SrchModal";
const Navbar = () => {
  const navigate = useNavigate();
  const [FHide, setFHide] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { register, handleSubmit, reset } = useForm();
  const cartItemssss = useSelector((state) => state.cart);
  console.log(cartItemssss);
  const [hides, sethides] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [LR, setLR] = useState(true);
  const [showPass, setshowPass] = useState(false);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);
  const auth = useSelector((state) => state.auth);
  const [srchbtnhide, setsrchbtnhide] = useState(false);
  // const token = useSelector((state) => state.auth.token);

  function logoutt() {
    reset();
    dispatch(logout());
    dispatch(logoutCart());
    // dispatch(cartLogout());

    navigate("/");
  }

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const CurrentUser = useSelector((state) => state.auth);
  console.log("authsjj", CurrentUser);
  console.log(isAuthenticated);

  const onRegistersubmit = async (value) => {
    console.log(value);
    try {
      const response = await RegisterAPi(value);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success === true) {
        setLR(!LR);
        setshowPass(false);
        messageApi.open({
          type: "success",
          content: data.message,
        });
        console.log(data);
        reset();
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
    console.log(value);
    try {
      const response = await loginAPi(value);

      const data = await response.json();
      // console.log(response);
      // console.log("resLogin", data);
      if (!response.ok) {
        throw new Error(data.message);
      }
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
        dispatch(setCurrentUser(data));
        dispatch(CartSet(data));
        setisopen(false);
        console.log(data);
        reset();
      }
      if (data.success === false) {
        messageApi.open({
          type: "error",
          content: data.message,
        });
        // dispatch(setCurrentUser(data));
      }
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: error.message,
      });
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
  const items = [
    {
      label: (
        <NavLink to="/user/account" className=" pr-10">
          My Profile
        </NavLink>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: <a onClick={() => logoutt()}>Logout</a>,
      key: "3",
    },
  ];

  const notcartopen = () => {
    message.open({
      type: "error",
      content: "please login to access this page",
    });
  };

  return (
    <>
      {contextHolder}
      <section className="relative">
        <SrchModal open={srchbtnhide} sethide={setsrchbtnhide}></SrchModal>
        <ForgetPassword setFHide={setFHide} FHide={FHide}></ForgetPassword>
        <header
          // style={{ display: stickyclass ? "none" : "" }}
          className=" hidden text-center lg:flex items-center justify-end pr-5 h-7 text-[12px] border-b-2 border-gray-300"
        >
          <ul className="flex items-center tracking-wider justify-between w-fit ">
            <li className=" border-l-2  px-3">
              {" "}
              <NavLink to="/store-locator">Store Locations</NavLink>{" "}
            </li>
            <li className=" border-l-2 border-r-2 px-3">
              {" "}
              <NavLink to="/contact">Contact Us</NavLink>{" "}
            </li>
            {isAuthenticated ? (
              <Dropdown
                className=""
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <p
                  onClick={(e) => e.preventDefault()}
                  className=" cursor-pointer  w-fit px-4 "
                >
                  <UserOutlined className="mr-1" />
                  {CurrentUser.currentUser.name}
                  <DownOutlined className=" ml-3" />
                </p>
              </Dropdown>
            ) : (
              <li
                className=" cursor-pointer  px-3"
                onClick={() => setisopen(!isopen)}
              >
                Login
              </li>
            )}

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
                        {...register("email")}
                        required
                      />
                      <p></p>
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
                        required
                        {...register("password")}
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
                      <p
                        onClick={() => {
                          setFHide(true);
                          setisopen(false);
                        }}
                        className=" cursor-pointer"
                      >
                        Forget Password?
                      </p>
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
                        {...register("name")}
                        required
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
                        {...register("email")}
                        required
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
                        {...register("phone")}
                        required
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
                        {...register("password")}
                        required
                      />
                    </div>
                    <div className=" ">
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
                      {/* <p>Forget Password?</p> */}
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
            className="  bg-white h-[70px] z-50  lg:shadow-[0] lg:border-b-2 border-gray-300 lg:h-[94px] w-full flex items-center justify-between px-2 lg:px-8"
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
                    state={{ url: "65f6a095577858f9f71a008e" }}
                    className=" text-sm font-medium text-gray-600 transition-all duration-100 ease-linear border-orange-400 pb-2 w-fit px-1 hover:border-b-2"
                  >
                    ANALOG
                  </NavLink>
                </li>
                <li className=" hidden lg:block">
                  <NavLink
                    to="/store"
                    state={{ url: "65f6a0d7577858f9f71a0091" }}
                    className=" text-sm font-medium text-gray-600 transition-all duration-100 ease-linear border-orange-400 pb-2 w-fit px-1 hover:border-b-2"
                  >
                    DIGITAL
                  </NavLink>
                </li>
                <li className=" hidden lg:block">
                  <NavLink
                    to="/store"
                    state={{ url: "65f6a100577858f9f71a0094" }}
                    className=" text-sm font-medium text-gray-600 transition-all duration-100 ease-linear border-orange-400 pb-2 w-fit px-1 hover:border-b-2"
                  >
                    SMARTWATCHS
                  </NavLink>
                </li>
                <li className=" hidden lg:block">
                  <NavLink
                    to="/store"
                    state={{ url: " " }}
                    className=" text-sm font-medium text-gray-600 transition-all duration-100 ease-linear border-orange-400 pb-2 w-fit px-1 hover:border-b-2"
                  >
                    ALL WATCHES
                  </NavLink>
                </li>

                <li onClick={() => setsrchbtnhide(true)} className=" relative">
                  <div className=" bg-slate-100 border h-10 w-11 grid place-content-center  items-center  gap-3 rounded-md">
                    <SearchOutlinedIcon className=" text-black" />
                    {/* <input
                      type="text"
                      placeholder="Search for products"
                      className=" bg-transparent outline-0 "
                    /> */}
                  </div>
                </li>
                {/* <li>
                  <NavLink to="/wishlist" className=" h-[25px] w-[30px]">
                    <FavoriteBorderOutlinedIcon id="heart" s />
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to={isAuthenticated ? "/cart" : ""}
                    className=" relative"
                  >
                    <Badge
                      count={cartItem}
                      size="small"
                      className=" absolute p-0 top-0 right-0 h-2 text-[10px]  mr-[-10px] mt-[-5px]"
                    ></Badge>
                    <ShoppingBagOutlinedIcon id="bag" />
                  </NavLink>
                </li>
              </ul>
            </div>
            <Drawer
              open={hides}
              // header={false}
              extra={
                <NavLink to="/" className=" font-bold text-xl">
                  Good Time
                </NavLink>
              }
              className=" m-0 p-0"
              // placement="left"
              onClick={() => sethides(false)}
            >
              <div
                className="bg-white  m-0 lg:hidden"
                // style={{ display: hides ? "none" : "" }}
              >
                <ul className="bg-white">
                  <li className=" border-b-[2px] font-semibold text-[16px] pb-4">
                    <NavLink
                      to="/store"
                      state={{ url: "65f6a095577858f9f71a008e" }}
                    >
                      ANALOG
                    </NavLink>
                  </li>
                  <li className=" border-b-[2px] font-semibold text-[16px] py-4">
                    <NavLink
                      to="/store"
                      state={{ url: "65f6a0d7577858f9f71a0091" }}
                    >
                      DIGITAL
                    </NavLink>
                  </li>
                  <li className=" border-b-[2px] font-semibold text-[16px] py-4">
                    <NavLink
                      to="/store"
                      state={{ url: "65f6a100577858f9f71a0094" }}
                    >
                      SMARTWATCH
                    </NavLink>
                  </li>
                  <li className=" font-semibold text-[16px] py-4">
                    <NavLink to="/store" state={{ url: " " }}>
                      ALL WATCHES
                    </NavLink>
                  </li>
                </ul>
                <ul className=" px-2 flex flex-col gap-5 h-fit py-6 rounded-md bg-slate-200">
                  {isAuthenticated ? (
                    <div>
                      <li className=" font-normal text-[16px]">
                        <NavLink to="/user/account">My Account</NavLink>
                      </li>

                      <li className="mt-4 font-normal text-[16px]">
                        <p onClick={() => logoutt()}>logout</p>
                      </li>
                    </div>
                  ) : (
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
                  )}

                  <li className=" font-normal text-[16px] ">
                    <NavLink to="/store-locator">Store Locations</NavLink>{" "}
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
