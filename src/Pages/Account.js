import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Drawer, Modal } from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
const Account = () => {
  const authData = useSelector((state) => state.auth.currentUser);

  // usestate for page hide
  const [profile, setprofile] = useState(true);
  const [wishlist, setwishlist] = useState(false);
  const [orders, setorders] = useState(false);
  const [profileD, setprofileD] = useState(false);
  const [wishlistD, setwishlistD] = useState(false);
  const [ordersD, setordersD] = useState(false);

  //created state for toEdit
  const [isEdit, setisEdit] = useState(false);
  return (
    <div>
      <div className=" h-[84vh] gap-8 flex px-3 lg:px-8  ">
        <div className="  lg:w-[300px] w-full flex flex-col lg:border-r-2 pt-6 gap-3">
          <div
            onClick={() => {
              setorders(false);
              setwishlist(false);
              setprofile(true);
              // setprofileD(true);
            }}
            className={`bg-slate-100 ${
              profile ? "bg-white text-orange-500" : ""
            } border hover:bg-white shadow-sm pl-2 rounded-tl-md rounded-bl-md hidden md:block overflow-hidden`}
          >
            <p className=" py-3 test-[18px] hover:text-orange-500 cursor-pointer">
              Profile
            </p>
          </div>
          <div
            onClick={() => {
              setprofileD(true);
              setordersD(false);
              setwishlistD(false);
            }}
            className={`bg-slate-100 ${
              profileD ? "bg-white text-orange-500" : ""
            } border hover:bg-white md:hidden shadow-sm pl-2 rounded-tl-md rounded-bl-md overflow-hidden`}
          >
            <p className=" py-3 test-[18px] hover:text-orange-500 cursor-pointer">
              Profile
            </p>
          </div>
          <div
            onClick={() => {
              setorders(true);
              setwishlist(false);
              setprofile(false);
            }}
            className={` hidden md:block bg-slate-100 border hover:bg-white shadow-sm  pl-2 rounded-tl-md rounded-bl-md  ${
              orders ? "bg-white text-orange-500" : ""
            }`}
          >
            <p className=" py-3 test-[18px] hover:text-orange-500 cursor-pointer">
              My Orders
            </p>
          </div>
          <div
            onClick={() => {
              setordersD(true);
              setwishlistD(false);
              setprofileD(false);
            }}
            className={` bg-slate-100 md:hidden border hover:bg-white shadow-sm  pl-2 rounded-tl-md rounded-bl-md  ${
              orders ? "bg-white text-orange-500" : ""
            }`}
          >
            <p className=" py-3 test-[18px] hover:text-orange-500 cursor-pointer">
              My Orders
            </p>
          </div>
          <div
            onClick={() => {
              setorders(false);
              setwishlist(true);
              setprofile(false);
            }}
            className={` bg-slate-100 border hidden md:block hover:bg-white shadow-sm   pl-2 rounded-tl-md rounded-bl-md ${
              wishlist ? "bg-white text-orange-500" : ""
            }`}
          >
            <p className=" py-3 test-[18px] hover:text-orange-500 cursor-pointer">
              My Wishlist
            </p>
          </div>
          <div
            onClick={() => {
              setordersD(false);
              setwishlistD(true);
              setprofileD(false);
            }}
            className={` bg-slate-100 border md:hidden hover:bg-white shadow-sm   pl-2 rounded-tl-md rounded-bl-md ${
              wishlist ? "bg-white text-orange-500" : ""
            }`}
          >
            <p className=" py-3 test-[18px] hover:text-orange-500 cursor-pointer">
              My Wishlist
            </p>
          </div>
          <div className=" bg-slate-100 border hover:bg-white shadow-sm  pl-2 rounded-tl-md rounded-bl-md">
            <p className=" py-3 test-[18px] hover:text-orange-500 cursor-pointer">
              Logout
            </p>
          </div>
        </div>

        <Drawer
          classNames=" md:hidden"
          open={profileD}
          className=" w-full m-0 "
          onClose={() => setprofileD(false)}
          closeIcon={<LeftCircleFilled />}
          title={
            <div className=" ml-[-6px]">
              {" "}
              <p className=" cursor-pointer" onClick={() => setprofileD(false)}>
                Account
              </p>
            </div>
          }
          style={{ padding: 0 }}
          width={"100%"}
          footer={false}
        >
          <div className="flex flex-col mt-[-15px] gap-4">
            <div>
              <p className=" lg:text-xl  text-2xl font-semibold">My Profile</p>
              <p className=" text-gray-500 mt-1">
                You can edit/update your profile information by click on edit
                profile button.
              </p>
            </div>
            <div className=" flex flex-col gap-3">
              <div className=" flex flex-col w-full gap-2">
                <div className=" w-full ">
                  <p className="text-[10px] font-medium text-gray-500">
                    FUll NAME
                  </p>
                  <input
                    type="text"
                    disabled={isEdit ? false : true}
                    value={authData.name}
                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent w-full outline-none text-[16px] `}
                  />
                </div>
                <div className=" w-full ">
                  <p className="text-[11px] font-medium text-gray-500">EMAIL</p>
                  <input
                    type="text"
                    value={authData.email}
                    disabled={isEdit ? false : true}
                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent w-full outline-none text-[16px]`}
                  />
                </div>
              </div>
              <div className=" flex flex-col w-full gap-2">
                <div className=" w-full">
                  <p className="text-[11px] font-medium text-gray-500">
                    PHONE NUMBER
                  </p>
                  <input
                    type="text"
                    disabled={isEdit ? false : true}
                    value={`${authData.phone}`}
                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent w-full outline-none text-[16px]`}
                  />
                </div>
                <div className="w-full">
                  <p className="text-[11px] font-medium text-gray-500">
                    ALTERNATIVE NUMBER
                  </p>
                  <input
                    type="text"
                    disabled={isEdit ? false : true}
                    value={`${authData.phone}`}
                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent w-full outline-none text-[16px]`}
                  />
                </div>
              </div>
              <div className=" flex flex-col w-full gap-2">
                <div className="w-full">
                  <p className="text-[11px]font-medium text-gray-500">
                    DATE OF BIRTH
                  </p>
                  <input
                    type="text"
                    disabled={isEdit ? false : true}
                    value="28/05/2003"
                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent w-full outline-none text-[16px]`}
                  />
                </div>
                <div className="w-full">
                  <p className="text-[11px]  font-medium text-gray-500">
                    GENDER
                  </p>
                  <input
                    type="text"
                    disabled={isEdit ? false : true}
                    value="male"
                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent w-full outline-none text-[16px]`}
                  />
                </div>
              </div>
              <div>
                <p className="text-[11px]  font-medium text-gray-500">
                  ADDRESS
                </p>
                <textarea
                  disabled={isEdit ? false : true}
                  type="text"
                  value="Samrat ashok nagar, vile parle east, mumbai, maharashtra 400099"
                  className={`${
                    isEdit ? "border p-2 rounded-md" : ""
                  } bg-transparent outline-none w-full h-20 text-[16px]`}
                />
              </div>
              <div className=" mt-[-8px]">
                {isEdit ? (
                  <div className=" flex gap-3">
                    <button
                      onClick={() => setisEdit(false)}
                      className=" uppercase bg-orange-500 w-[130px]  h-10 text-[14px]  text-white font-semibold px-2 rounded-md"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={() => setisEdit(false)}
                      className=" uppercase bg-orange-500 w-[130px]  h-10 text-[14px] text-white font-semibold px-2 rounded-md"
                    >
                      SAVE
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setisEdit(true)}
                    className="uppercase bg-orange-500 w-[130px]  h-10 text-white text-[14px]  font-semibold px-2 rounded-md"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </Drawer>

        <Drawer
          open={ordersD}
          className=" w-full m-0 "
          header={<p>hii</p>}
          onClose={() => setordersD(false)}
          closeIcon={<LeftCircleFilled />}
          title={
            <div className=" ml-[-6px]">
              {" "}
              <p className=" cursor-pointer" onClick={() => setordersD(false)}>
                Account
              </p>
            </div>
          }
          style={{ padding: 0 }}
          width={"100%"}
          footer={false}
        >
          <div className="flex flex-col mt-[-15px] gap-4">
            <div>
              <p className=" lg:text-xl  text-2xl font-semibold">My Orders</p>
              <p className=" text-gray-500 mt-1">View and Manage your orders</p>
            </div>
          </div>
        </Drawer>
        <Drawer
          open={wishlistD}
          className=" w-full m-0 "
          header={<p>hii</p>}
          onClose={() => setwishlistD(false)}
          closeIcon={<LeftCircleFilled className="ml-[-10px]" />}
          title={
            <div className=" ml-[-6px]">
              {" "}
              <p
                className=" cursor-pointer"
                onClick={() => setwishlistD(false)}
              >
                Account
              </p>
            </div>
          }
          bodystyle={{ padding: "0px" }}
          width={"100%"}
          footer={false}
        >
          <div className=" flex flex-col mt-[-15px] gap-4">
            <div>
              <p className=" lg:text-xl  text-2xl font-semibold">My Wishlist</p>
              <p className=" text-gray-500 mt-1">
                Wishlist the product that you like
              </p>
            </div>
          </div>
        </Drawer>

        <div className=" pt-6 hidden md:block w-full">
          <div className={`${profile ? "" : "hidden"} h-full`}>
            <div className="flex flex-col gap-4">
              <div>
                <p className=" lg:text-3xl  text-2xl font-semibold">
                  My Profile
                </p>
                <p className=" text-gray-500 mt-1">
                  You can edit/update your profile information by click on edit
                  profile button.
                </p>
              </div>
              <div className=" flex flex-col gap-3">
                <div className=" flex w-full gap-2">
                  <div>
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      FUll NAME
                    </p>
                    <input
                      type="text"
                      disabled={isEdit ? false : true}
                      value={authData.name}
                      className={`${
                        isEdit ? "border p-2 rounded-md" : ""
                      } bg-transparent outline-none text-xl lg:text-2xl`}
                    />
                  </div>
                  <div>
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      EMAIL
                    </p>
                    <input
                      type="text"
                      value={authData.email}
                      disabled={isEdit ? false : true}
                      className={`${
                        isEdit ? "border p-2 rounded-md" : ""
                      } bg-transparent w-[380px] outline-none text-xl lg:text-2xl`}
                    />
                  </div>
                </div>
                <div className=" flex w-full gap-2">
                  <div>
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      PHONE NUMBER
                    </p>
                    <input
                      type="text"
                      disabled={isEdit ? false : true}
                      value={`${authData.phone}`}
                      className={`${
                        isEdit ? "border p-2 rounded-md" : ""
                      } bg-transparent outline-none text-xl lg:text-2xl`}
                    />
                  </div>
                  <div>
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      ALTERNATIVE NUMBER
                    </p>
                    <input
                      type="text"
                      disabled={isEdit ? false : true}
                      value={`${authData.phone}`}
                      className={`${
                        isEdit ? "border p-2 rounded-md" : ""
                      } bg-transparent outline-none text-xl lg:text-2xl`}
                    />
                  </div>
                </div>
                <div className=" flex w-full gap-2">
                  <div>
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      DATE OF BIRTH
                    </p>
                    <input
                      type="text"
                      disabled={isEdit ? false : true}
                      value="28/05/2003"
                      className={`${
                        isEdit ? "border p-2 rounded-md" : ""
                      } bg-transparent outline-none text-xl lg:text-2xl`}
                    />
                  </div>
                  <div>
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      GENDER
                    </p>
                    <input
                      type="text"
                      disabled={isEdit ? false : true}
                      value="male"
                      className={`${
                        isEdit ? "border p-2 rounded-md" : ""
                      } bg-transparent outline-none text-xl lg:text-2xl`}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                    ADDRESS
                  </p>
                  <textarea
                    disabled={isEdit ? false : true}
                    type="text"
                    value="Samrat ashok nagar, vile parle east, mumbai, maharashtra 400099"
                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent outline-none w-full h-20 text-xl lg:text-2xl`}
                  />
                </div>
                <div className=" mt-[-8px]">
                  {isEdit ? (
                    <div className=" flex gap-3">
                      <button
                        onClick={() => setisEdit(false)}
                        className=" uppercase bg-orange-500 w-[130px] lg:w-[150px] h-12 text-[16px] lg:text-[18px] text-white font-semibold px-2 rounded-md"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={() => setisEdit(false)}
                        className=" uppercase bg-orange-500 w-[130px] lg:w-[150px] h-12 text-[16px] lg:text-[18px] text-white font-semibold px-2 rounded-md"
                      >
                        SAVE
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setisEdit(true)}
                      className="uppercase bg-orange-500 w-[130px] lg:w-[150px] h-12 text-white text-[16px] lg:text-[18px] font-semibold px-2 rounded-md"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={`${orders ? "" : "hidden"} h-full`}>
            <div>
              <p className=" lg:text-3xl  text-2xl font-semibold">My Orders</p>
              <p className=" text-gray-500 mt-1">
                You can edit/update your profile information by click on edit
                profile button.
              </p>
            </div>
          </div>
          <div className={`${wishlist ? "" : "hidden"} h-full`}>
            <div>
              <p className=" lg:text-3xl  text-2xl font-semibold">
                My Wishlist
              </p>
              <p className=" text-gray-500 mt-1">
                You can edit/update your profile information by click on edit
                profile button.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
