import React from "react";
import StoreAddress from "../components/StoreAddress";

const StoreLocator = () => {
  return (
    <div className=" px-3 lg:px-6">
      <div className=" text-2xl font-semibold flex justify-center py-2 md:py-5 mt-3 items-center">
        <p className="border-b-[3px] pb-2 border-red-600 w-fit  text-2xl md:text-3xl capitalize">
          store Locator
        </p>
      </div>
      <div className=" flex flex-col justify-center items-center">
        {/* <div className="">
          <img
            src={require("../img/abtpageimg.jpg")}
            className=" h-[500px] w-full "
            alt=""
          />
        </div> */}

        <div className=" max-w-[1230px] flex my-5 md:my-10 gap-4 md:gap-8 justify-center flex-wrap">
          <StoreAddress />
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
