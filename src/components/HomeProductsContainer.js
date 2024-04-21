import React from "react";
import { useState, useEffect } from "react";
import Products from "./Products";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import Products from "./Products";
import { products } from "../ProductsData";
import { getAllProducts } from "../apis/Api";
import { NavLink } from "react-router-dom";
const HomeProductsContainer = ({ title, subtitle, types }) => {
  const [datas, setdatas] = useState();

  const getProducts = async () => {
    // setisloading(true);
    try {
      const res = await getAllProducts();
      console.log(res);
      const data = await res.json();
      // console.log("datas", data.products);
      console.log("aww", data);
      // datas ? setdatas(data.products) : "";
      setdatas(data.products);
      // setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  // console.log(datas);
  // const fetchData = () => {
  //   axios
  //     .get("https://api.escuelajs.co/api/v1/products/?categoryId=1")
  //     .then((res) => setdatas(res.data));
  // };
  // useEffect(() => {
  //   fetchData();

  //   console.log(datas);
  // }, []);
  let first8Products = datas?.slice(0, 8);
  console.log("first8Products", first8Products);
  return (
    <>
      <section className=" flex justify-center w-full">
        <div className=" flex items-center flex-col w-[1250px]  px-3 lg:px-6">
          <div className=" text-center w-full flex flex-col justify-center items-center">
            <h2 className=" font-semibold text-[18px] md:text-[26px]">
              {title}
            </h2>
            <p className=" font-normal text-gray-700 text-[12px] md:text-[16px]">
              {subtitle}
            </p>
            <div className=" h-[3px] w-10 bg-red-500 mt-3 md:mt-4"></div>
          </div>
          <div className=" mt-5 sm:mt-6 w-full h-fit  flex justify-center xl:justify-between flex-wrap gap-2 sm:gap-5">
            {/* <div className="h-80 w-64 bg-slate-400"></div> */}
            {first8Products?.map((items) => (
              <Products data={items} type=""></Products>
            ))}
          </div>
          <NavLink
            to="/store"
            className=" mt-5 sm:mt-6 relative transition duration-400 ease-linear  group border-2 flex text-center justify-center gap-3 hover:bg-red-600 hover:text-white  items-center w-64 h-12 border-red-600 tracking-wide text-red-600 font-medium text-[13px]"
          >
            VIEW ALL PRODUCTS{" "}
            <div className="w-[40px] group-hover:pl-4 ">
              <div className="">
                <ArrowForwardIcon
                  // color="error"
                  fontSize="medium"
                />
              </div>
            </div>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default HomeProductsContainer;
