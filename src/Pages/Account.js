import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../ReduxApi/authSlice";
import { Controller, useForm } from "react-hook-form";
import { Drawer, Modal, DatePicker, message, Select } from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { UserDataUpate } from "../apis/Api";
const Account = () => {
  const authData = useSelector((state) => state.auth.currentUser);

  console.log("authData", authData);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [userData, setuserData] = useState(authData);

  // for large dissplay
  const { register, reset, handleSubmit } = useForm({
    defaultValues: userData,
  });
  //for small display
  const {
    register: register2,
    reset: reset2,
    handleSubmit: handelsubmit2,
  } = useForm({
    defaultValues: userData,
  });

  const userupdate = (user) => {
    dispatch(setUser(user));
  };

  // usestate for page hide
  const [profile, setprofile] = useState(true);
  const [wishlist, setwishlist] = useState(false);
  const [orders, setorders] = useState(false);
  const [profileD, setprofileD] = useState(false);
  const [wishlistD, setwishlistD] = useState(false);
  const [ordersD, setordersD] = useState(false);
  const [userGender, setuserGender] = useState();
  const [userDOB, setuserDOB] = useState();
  const [address, setaddress] = useState({
    Area: "",
    city: "",
    state: "",
    pincode: "",
    county: "",
  });

  // for small display
  const [userGender2, setuserGender2] = useState();
  const [userDOB2, setuserDOB2] = useState();
  const [address2, setaddress2] = useState({
    area: "",
    city: "",
    state: "",
    pincode: "",
    county: "",
  });

  const dateFormat = "YYYY/MM/DD";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY/MM";

  //created state for toEdit
  const [isEdit, setisEdit] = useState(false);

  const { control } = useForm();
  // const HandelUsserData = (Name, value) => {
  //   setuserData({ ...userData, Name: value });
  //   console.log(userData);
  // };
  const HandelUsserData2 = async (value) => {
    const userData = {
      ...authData,
      ...value,
      gender: userGender,
      dob: userDOB,
      address: [address],
    };
    console.log("data bheja maine", userData);
    // const res = fetch("")
    const res = await UserDataUpate(userData, token);
    // console.log(res);
    const data = await res.json();
    console.log("Update Response", data);
    if (data.success) {
      userupdate(data);
      messageApi.open({
        type: "success",
        content: data.message,
      });
      setisEdit(false);
    } else {
      // const data = await res.JSON();

      messageApi.open({
        type: "error",
        content: data.message,
      });
    }
    console.log("after update", userData);
    console.log("after update", userData.gender);

    // console.log(data);
  };

  const HandelUsserData = async (value) => {
    const userData = {
      ...authData,
      ...value,
      gender: userGender,
      dob: userDOB,
    };
    console.log("data bheja maine", userData);
    // const res = fetch("")
    const res = await UserDataUpate(userData, token);
    // console.log(res);
    const data = await res.json();
    console.log("Update Response", data);
    if (data.success) {
      userupdate(data);
      messageApi.open({
        type: "success",
        content: data.message,
      });
      setisEdit(false);
    } else {
      // const data = await res.JSON();

      messageApi.open({
        type: "error",
        content: data.message,
      });
    }
    console.log("after update data coming from auth local storage", userData);
    // console.log("after update", userData.gender);

    // console.log(data);
  };

  const onChange = (date, dateString) => {
    console.log(dateString);
    setuserDOB(dateString);
  };

  const onChange2 = (date, dateString) => {
    console.log(dateString);
    setuserDOB2(dateString);
  };
  const onChangeGender = (Gender) => {
    console.log(Gender);
    setuserGender(Gender);
  };
  const onChangeGender2 = (Gender) => {
    console.log(Gender);
    setuserGender2(Gender);
  };
  const { Option } = Select;
  const genderSelect = ["Male", "Female", "Other"];
  return (
    <div>
      {contextHolder}

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
          <form
            onSubmit={handleSubmit(HandelUsserData2)}
            className=" flex flex-col gap-3"
          >
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
                    {...register2("name")}
                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent w-full outline-none text-[16px] `}
                  />
                </div>
                <div className=" w-full ">
                  <p className="text-[11px] font-medium text-gray-500">EMAIL</p>
                  <input
                    type="text"
                    {...register2("email")}
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
                    {...register2("phone")}
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
                    {...register2("phone")}
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
                  {isEdit ? (
                    <DatePicker
                      defaultValue={dayjs(
                        userData?.dob === null ? "" : userData?.dob.slice(0, 10)
                      )}
                      format={dateFormat}
                      className="w-full text-[16px] font-semibold h-10"
                      onChange={onChange2}
                      style={{ fontSize: "20px" }}
                    />
                  ) : (
                    // <input
                    //   type="text"
                    //   disabled
                    //   value="28/05/2003"
                    //   className={`${
                    //     isEdit ? "border p-2 rounded-md" : ""
                    //   } bg-transparent outline-none text-xl lg:text-2xl`}
                    // />
                    <p className=" text-[16px]">
                      {userData?.dob === null ? "" : userData?.dob.slice(0, 10)}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <p className="text-[11px]  font-medium text-gray-500">
                    GENDER
                  </p>
                  {isEdit ? (
                    <Select
                      // defaultValue={"Other"}
                      defaultValue={userData.gender || ""}
                      name="gender"
                      // {...register("gender")}
                      className="w-full font-semibold h-10"
                      onChange={onChangeGender}
                    >
                      <Option value="Male" className="text-xl">
                        Male
                      </Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  ) : (
                    <p className="bg-transparent text-[16px]">
                      {userData?.gender}
                    </p>
                  )}
                  {/* <Select></Select> */}
                  {/* <input
                    type="text"

                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent w-full outline-none text-[16px]`}
                  /> */}
                </div>
              </div>
              <div>
                <p className="text-[11px]  font-medium text-gray-500">
                  ADDRESS
                </p>

                {isEdit ? (
                  <div>
                    <div className=" ">
                      <div className=" mt-1">
                        <p className="text-[10px] lg:text-[15px] font-medium text-gray-500">
                          HOUSE / BUILDING NO
                        </p>
                        <input
                          placeholder="area"
                          className=" h-10 rounded-md w-full outline-none text-[16px] border"
                          type="text"
                          value={address2.building_no}
                          onChange={(e) =>
                            setaddress2({
                              ...address2,
                              building_no: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className=" mt-1">
                        <p className="text-[10px] lg:text-[15px] font-medium text-gray-500">
                          CITY
                        </p>
                        <input
                          placeholder="city"
                          className=" h-10 w-full px-2 rounded-md outline-none text-[16px] border"
                          type="text"
                          value={address2.city}
                          onChange={(e) =>
                            setaddress({ ...address2, city: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-1">
                      <div>
                        <p className="text-[10px] lg:text-[15px] font-medium text-gray-500">
                          STATE
                        </p>
                        <input
                          placeholder="area"
                          className=" h-10 rounded-md px-2 w-full outline-none text-[16px] border"
                          type="text"
                          value={address2.state}
                          onChange={(e) =>
                            setaddress({ ...address2, state: e.target.value })
                          }
                        />
                      </div>
                      <div className=" mt-1">
                        <p className="text-[10px] lg:text-[15px] font-medium text-gray-500">
                          PINCODE
                        </p>
                        <input
                          placeholder="area"
                          className=" h-10 rounded-md px-2 text-[16px] w-full border"
                          type="text"
                          value={address2.pincode}
                          onChange={(e) =>
                            setaddress({
                              ...address2,
                              pincode: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // <input
                  //   type="text"
                  //   disabled
                  //   value="28/05/2003"
                  //   className={`${
                  //     isEdit ? "border p-2 rounded-md" : ""
                  //   } bg-transparent outline-none text-xl lg:text-2xl`}
                  // />
                  <p className="text-xl lg:text-2xl mb-4 h-8">
                    {authData.address.Area}, {authData.address.city},{" "}
                    {authData.address.state} :-
                    {authData.address.pincode}, {authData.address.county}
                  </p>
                )}
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
                      type="submit"
                      // onClick={() => setisEdit(false)}
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
          </form>
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
              <form
                onSubmit={handleSubmit(HandelUsserData)}
                className=" flex flex-col gap-3"
              >
                <div className=" flex w-full gap-2">
                  <div>
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      FUll NAME
                    </p>
                    <input
                      type="text"
                      disabled={isEdit ? false : true}
                      // value={userData.name}
                      // onChange={(e) => HandelUsserData("name", e.target.value)}
                      {...register("name")}
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
                      {...register("email")}
                      disabled={isEdit ? false : true}
                      className={`${
                        isEdit ? "border p-2 rounded-md" : ""
                      } bg-transparent w-[380px] outline-none text-xl lg:text-2xl`}
                    />
                  </div>
                </div>
                <div className=" flex w-full gap-2 ">
                  <div className=" ">
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      PHONE NUMBER
                    </p>
                    <input
                      type="text"
                      disabled={isEdit ? false : true}
                      {...register("phone")}
                      className={`${
                        isEdit ? "border p-2 rounded-md" : ""
                      } bg-transparent outline-none text-xl lg:text-2xl`}
                    />
                  </div>
                  <div className="">
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      ALTERNATIVE NUMBER
                    </p>
                    <input
                      type="text"
                      disabled={isEdit ? false : true}
                      {...register("phone")}
                      className={`${
                        isEdit ? "border p-2 rounded-md" : ""
                      } bg-transparent outline-none text-xl lg:text-2xl`}
                    />
                  </div>
                </div>
                <div className=" flex w-full gap-4">
                  <div className=" w-[235px]  lg:w-[280px]">
                    <p className="text-[13px] h-6 lg:text-[15px] font-medium text-gray-500">
                      DATE OF BIRTH
                    </p>

                    {isEdit ? (
                      <DatePicker
                        defaultValue={dayjs(
                          userData?.dob === null
                            ? ""
                            : userData?.dob.slice(0, 10)
                        )}
                        format={dateFormat}
                        className="w-[243px] lg:w-[289px] text-xl font-semibold lg:text-2xl h-12"
                        onChange={onChange}
                        style={{ fontSize: "20px" }}
                      />
                    ) : (
                      // <input
                      //   type="text"
                      //   disabled
                      //   value="28/05/2003"
                      //   className={`${
                      //     isEdit ? "border p-2 rounded-md" : ""
                      //   } bg-transparent outline-none text-xl lg:text-2xl`}
                      // />
                      <p className=" text-xl lg:text-2xl">
                        {authData?.dob === null
                          ? ""
                          : authData?.dob.slice(0, 10)}
                      </p>
                    )}
                  </div>
                  <div className=" w-64">
                    <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                      GENDER
                    </p>
                    {isEdit ? (
                      <Select
                        // defaultValue={"Other"}
                        defaultValue={
                          authData.gender === "" ? "" : authData.gender
                        }
                        name="gender"
                        // {...register("gender")}
                        className=" w-[243px] lg:w-[289px] text-xl font-semibold lg:text-2xl h-12"
                        onChange={onChangeGender}
                      >
                        <Option value="Male" className="text-xl">
                          Male
                        </Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    ) : (
                      <p className="bg-transparent h-6 outline-none text-xl lg:text-2xl">
                        {authData?.gender}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[13px] lg:text-[18px] mb-2 font-medium text-gray-500">
                    ADDRESS
                  </p>

                  {isEdit ? (
                    <div>
                      <div className=" gap-2 flex">
                        <div>
                          <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                            HOUSE / BUILDING NO
                          </p>
                          <input
                            placeholder="area"
                            className=" h-12 rounded-md px-2 text-xl lg:text-2xl w-[243px] lg:w-[289px] border"
                            type="text"
                            // value={address.Area}
                            // onChange={(e) =>
                            //   setaddress({
                            //     ...address,
                            //     Area: e.target.value,
                            //   })
                            // }
                            {...register("address.Area")}
                          />
                        </div>
                        <div>
                          <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                            CITY
                          </p>
                          <input
                            placeholder="city"
                            className=" h-12 w-[243px] text-xl lg:text-2xl rounded-md px-2 lg:w-[289px] border"
                            type="text"
                            // value={address.city}
                            // onChange={(e) =>
                            //   setaddress({ ...address, city: e.target.value })
                            // }
                            {...register("address.city")}
                          />
                        </div>
                      </div>
                      <div className="gap-2 flex mt-3 mb-3">
                        <div>
                          <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                            STATE
                          </p>
                          <input
                            placeholder=""
                            className=" h-12 rounded-md px-2 text-xl lg:text-2xl w-[243px] lg:w-[289px] border"
                            type="text"
                            // value={address.state}
                            // onChange={(e) =>
                            //   setaddress({ ...address, state: e.target.value })
                            // }
                            {...register("address.state")}
                          />
                        </div>
                        <div>
                          <p className="text-[13px] lg:text-[15px] font-medium text-gray-500">
                            PINCODE
                          </p>
                          <input
                            placeholder=""
                            className=" h-12 rounded-md px-2 text-xl lg:text-2xl w-[243px] lg:w-[289px] border"
                            type="text"
                            // value={address.pincode}
                            // onChange={(e) =>
                            //   setaddress({
                            //     ...address,
                            //     pincode: e.target.value,
                            //   })
                            // }
                            {...register("address.pincode")}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xl lg:text-2xl mb-4 h-8">
                      {authData.address.Area}, {authData.address.city},{" "}
                      {authData.address.state} :-
                      {authData.address.pincode}, {authData.address.county}
                    </p>
                  )}

                  {/* <textarea
                    disabled={isEdit ? false : true}
                    type="text"
                    value="Samrat ashok nagar, vile parle east, mumbai, maharashtra 400099"
                    className={`${
                      isEdit ? "border p-2 rounded-md" : ""
                    } bg-transparent outline-none w-full h-20 text-xl lg:text-2xl`}
                  /> */}
                  {/* <p></p> */}
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
                        // onClick={() => setisEdit(false)}
                        type="submit"
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
              </form>
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
