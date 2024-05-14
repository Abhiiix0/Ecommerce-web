import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className=" flex items-center bg-white w-full justify-center flex-col">
        <div className=" bg-slate-100 w-full flex justify-center py-5">
          <div className=" w-[1250px] flex flex-col md:flex-row gap-3 px-3 lg:px-6 md:flex">
            <div className="  md:w-[50%]">
              <p className=" font-semibold text-xl md:text-2xl">
                Get Cuppons & Offers
              </p>
              <p className=" text-gray-400 text-[16px] mt-1">
                You may unsubscribe at any moment. For that purpose, please find
                our contact info in the legal notice.
              </p>
            </div>
            <div className=" md:w-[50%]">
              <div className=" flex">
                <input
                  type="text"
                  placeholder="Your email address"
                  className=" h-12 w-full px-3 rounded-sm outline-none
                  "
                />
                <button className=" bg-red-600 text-white h-12 w-fit px-4 rounded-sm">
                  SUBSCRIBE
                </button>
              </div>
              <p className=" text-gray-400 text-[12px] mt-2">
                <span className=" text-red-500 m-[4px]">*</span>Don't worry we
                don't spam
              </p>
            </div>
          </div>
        </div>

        <div className=" pt-10 pb-8 lg:max-w-[1250px] px-3 lg:px-6 w-full  flex lg:justify-between flex-col lg:flex-row gap-6 ">
          <div className=" flex flex-col  gap-6 lg:w-72 ">
            <div className=" flex flex-col gap-2">
              <p className=" font-semibold">REGISTERED OFFICE ADDRESS</p>
              <p className=" text-sm text-gray-500 ">
                Good Times Pvt Ltd <br />
                Lotus Corporate Park Wing G02 - 1502, <br />
                Ram Mandir Lane, off Western Express Highway, Goregaon, Mumbai,
                400063
              </p>
            </div>
            <div className=" flex flex-col gap-1">
              <p className=" font-semibold">OFFICE TIMINGS</p>
              <p className=" text-sm text-gray-500">
                Mon - sat: 10:00 am - 07:00 pm
              </p>
            </div>
          </div>

          <div>
            <p className=" font-semibold">USEFUL LINKS</p>
            <div className=" lg:flex lg:flex-col lg:gap-1 mt-2">
              <NavLink
                to="/contact"
                className=" text-gray-500 text-sm border-r-2 lg:border-r-0 border-gray-400 h-fit pr-2  mr-2 hover:text-orange-500"
              >
                Contact us
              </NavLink>
              <NavLink
                to="/store-locator"
                className=" text-gray-500 text-sm border-r-2 border-gray-400 lg:border-r-0 h-fit pr-2  mr-2 hover:text-orange-500"
              >
                Store Locations
              </NavLink>

              {/* <NavLink className=" text-gray-500 text-sm border-r-2 border-gray-400 lg:border-r-0 h-fit pr-2  mr-2 hover:text-orange-500">
                Term & Conditions
              </NavLink>

              <NavLink className=" text-gray-500 text-sm border-r-2 border-gray-400 lg:border-r-0 h-fit pr-2 mr-2 hover:text-orange-500">
                How To Order
              </NavLink> */}
            </div>
          </div>
          <div>
            <p className=" font-semibold">CATEGORIES</p>
            <div className=" lg:flex lg:flex-col lg:gap-1 mt-2">
              <NavLink
                to="/store"
                state={{ url: "65f6a095577858f9f71a008e" }}
                className=" text-gray-500 text-sm border-r-2 border-gray-400 lg:border-r-0 h-fit pr-2  mr-2 hover:text-orange-500"
              >
                Analog
              </NavLink>

              <NavLink
                to="/store"
                state={{ url: "65f6a0d7577858f9f71a0091" }}
                className=" text-gray-500 text-sm border-r-2 hover:text-orange-500 lg:border-r-0 border-gray-400 h-fit pr-2 mr-2"
              >
                Digital
              </NavLink>
              <NavLink
                to="/store"
                state={{ url: "65f6a100577858f9f71a0094" }}
                className=" text-gray-500 text-sm border-r-2 border-gray-400 lg:border-r-0 hover:text-orange-500 h-fit pr-2  mr-2"
              >
                Smartwatch
              </NavLink>

              <NavLink
                to="/store"
                state={{ url: " " }}
                className=" text-gray-500 hover:text-orange-500 text-sm border-r-2 lg:border-r-0 border-gray-400 h-fit pr-2 mr-2"
              >
                All Watch
              </NavLink>
            </div>
          </div>
          <div>
            <p className=" font-semibold">SUPPORT</p>
            <div className=" flex gap-3 items-center flex-wrap lg:flex-col lg:items-start lg:mt-2">
              <div>
                <p>Mail</p>
                <p className=" font-medium text-gray-500 text-sm">
                  goodtime4info@gmail.com
                </p>
              </div>
              <div>
                <p>phone</p>
                <p className=" font-medium text-gray-500 text-sm">
                  +91 966 7976-977
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div className=" border-t-2 w-full flex justify-center">
          <div className=" py-5 lg:max-w-[1250px] w-full px-3 lg:px-6 flex flex-col lg:flex-row lg:justify-between gap-4">
            <div className="text-center flex items-center lg:flex-row justify-center flex-col gap-2">
              <p>100% Secure Payment</p>

              <img
                src={require("../img/payments.png")}
                className="h-6"
                alt=""
              />
            </div>
            <div className="text-center  flex items-center justify-center flex-col lg:flex-row gap-2">
              <p>Follow us:</p>
              <div className="flex gap-2  h-11 items-center justify-center">
                <a href="#">
                  <img
                    src={require("../img/Fb.png")}
                    className="transition-all duration-100 hover:mb-2 h-8"
                    alt=""
                  />
                </a>
                <a href="#">
                  <img
                    src={require("../img/insta.png")}
                    className="transition-all duration-100 hover:mb-2 h-8"
                    alt=""
                  />
                </a>
                <a href="#">
                  <img
                    src={require("../img/twitter.png")}
                    className="transition-all duration-100 hover:mb-2 h-8"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className=" w-full border-t-2 text-[14px] font-light  text-center py-2 w-fit]  text-gray-400">
            &copy; 2024 www.GoodTimes.in All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
