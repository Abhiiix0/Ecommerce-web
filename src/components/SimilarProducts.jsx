import React from "react";
import { useState, useEffect } from "react";
import Products from "./Products";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import Products from "./Products";
import { products } from "../ProductsData";
import { getAllProducts } from "../apis/Api";
import { Link } from "react-router-dom";
const SimilarProducts = (similar) => {
  // console.log(similar);
  const [datas, setdatas] = useState();
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const getProducts = async () => {
    // setisloading(true);
    try {
      const res = await getAllProducts();
      // console.log(res);
      const data = await res.json();
      // console.log("datas", data.products);
      // console.log("aww", data);
      // datas ? setdatas(data.products) : "";
      let similarrr = data.products.filter(
        (e) => e.dialcolor[0] === similar.similar
      );

      // console.log(similarrr);
      setdatas(similarrr);
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
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top of the page smoothly
  };
  let first8Products = datas?.slice(0, 4);
  // console.log("first8Products", first8Products);
  return (
    <>
      <section className=" flex justify-center w-full">
        <div className=" flex items-center flex-col max-w-[1250px]  px-3 lg:px-6">
          <div className=" mt-5 sm:mt-6 w-full flex justify-between md:gap-6 gap-y-6 flex-wrap h-fit ">
            {/* <div className="h-80 w-64 bg-slate-400"></div> */}

            {first8Products?.map((items) => (
              <Products data={items} type=""></Products>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SimilarProducts;
