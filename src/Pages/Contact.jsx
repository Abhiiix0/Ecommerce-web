import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
  return (
    <>
      <h2 className=" text-[25px] sm:text-[34px] uppercase tracking-wider font-semibold mt-20 text-center">
        Contact Us
      </h2>
      <div className="flex justify-center items-center w-full">
        <div className=" flex gap-3 px-3 md:px-6  flex-wrap justify-center sm:justify-between h-fits py-12 md:py-20 w-[1250px] ">
          <div className="flex flex-col gap-2 w-[250px] p-3">
            <CallIcon fontSize="large" />
            <p className="text-[18px] font-semibold">Call Now</p>
            <div className="h-[2px] w-10 bg-red-500"></div>
            <a href="tel:+88556998568" className="text-[15px] text-red-500">
              88556998568
            </a>
            <p className="text-[15px] text-gray-500">
              Mon - Sat : 10:30 AM to 06:00 PM
            </p>
          </div>
          <div className="flex flex-col gap-2 w-[250px]  p-3">
            <ChatIcon fontSize="large" />
            <p className="text-[18px] font-semibold">Chat Now</p>
            <div className="h-[2px] w-10 bg-red-500"></div>
            <p className="text-[15px] text-red-500">Chat with us</p>
            <p className="text-[15px]  text-gray-500">
              Mon - Sat : 10:30 AM to 06:00 PM
            </p>
          </div>
          <div className="flex flex-col  w-[250px] gap-2 p-3">
            <EmailIcon fontSize="large" />
            <p className="text-[18px] font-semibold">Call Now</p>
            <div className="h-[2px] w-10 bg-red-500"></div>

            <a
              href="mailto:goodtime4info@gmail.com"
              className="text-[15px] text-red-500"
            >
              goodtime4info@gmail.com
            </a>
            <p className="text-[15px] text-gray-500">
              We will try to revert you ASAP.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
