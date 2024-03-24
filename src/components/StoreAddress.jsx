import React from "react";

const StoreAddress = () => {
  return (
    <div className=" border-[1px] w-full  bg-slate-50 rounded-md p-2 md:w-[340px]">
      <div className="my-3">
        <p className=" font-semibold capitalize text-2xl  w-fit">
          Andheri West
        </p>
        <div className=" bg-red-500 w-16 h-1 my-4 "></div>
      </div>

      <div className=" my-3">
        <p>
          Shop No. 32, Laxmi mall, SV Rd, next to Sony Mony Electronics, Mhatre
          Wadi, Andheri West, Mumbai, 400092, India
        </p>
      </div>

      <div className=" my-3">
        <p>Contact Details:</p>
        <p>Phone: +915486257928</p>
      </div>
      <div className=" my-3">
        <p>Business Hours:</p>
        <p>11:00 AM to 10:00 PM (open 7 days a week)</p>
      </div>
      <button className=" my-3 hover:bg-red-700 bg-red-600 tracking-wider rounded-md h-10 w-fit px-4 text-white font-semibold">
        {" "}
        Direction
      </button>
    </div>
  );
};

export default StoreAddress;
