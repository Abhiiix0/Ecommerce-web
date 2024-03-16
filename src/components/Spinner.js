import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
const Spinner = ({ path }) => {
  const [count, setcount] = useState(2);
  const navigate = useNavigate();
  //   const location = useLocation();
  //   const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const interval = setInterval(() => {
      setcount((prevCount) => --prevCount);
    }, 1000);
    count === 0 && navigate("/");
    // count === 0 &&
    //   messageApi.open({
    //     type: "error",
    //     content: "Please Login",
    //   });
    return () => clearInterval(interval);
  }, [count, navigate, path]);

  return (
    <>
      {/* {contextHolder} */}
      <div className=" h-[85vh] w-full flex justify-center items-center">
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2"
        >
          <svg
            className="h-10 w-10 md:h-14 md:w-14 animate-spin stroke-gray-500"
            viewBox="0 0 256 256"
          >
            <line
              x1={128}
              y1={32}
              x2={128}
              y2={64}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1={224}
              y1={128}
              x2={192}
              y2={128}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1={128}
              y1={224}
              x2={128}
              y2={192}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1={32}
              y1={128}
              x2={64}
              y2={128}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            ></line>
          </svg>
          <span className="  text-3xl font-medium text-gray-500">
            Loading...
          </span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
