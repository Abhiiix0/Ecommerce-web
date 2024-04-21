import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../apis/Api";
import { Button, Image, message } from "antd";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedIcon from "@mui/icons-material/Verified";
import { HeartOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import SimilarProducts from "../components/SimilarProducts";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../ReduxApi/AddToCart";
import { Token } from "@mui/icons-material";
import { addToCartController } from "../apis/Api";
import { addTocartProducts } from "../ReduxApi/authSlice";
const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [visible, setVisible] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const handeladdcart = async (item) => {
    try {
      const dataa = {
        productId: item,
        auantity: 1,
      };
      console.log(item, token);

      const res = await addToCartController(dataa, token);
      const data = await res.json();

      if (data.success) {
        console.log("cart api", data);
        message.open({
          type: "success",
          content: data.message,
        });
        dispatch(addToCart(data));
      } else {
        console.log("cart api", data);
        message.open({
          type: "error",
          content: data.message,
        });
        // dispatch(addToCart(data));
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error,
      });
      console.log("err", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetSingleProduct(slug); // Assuming your API endpoint is '/api/products/:slug'
        // console.log("data", response);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        // console.log("data", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" px-3 md:px-8 py-4 md:py-8">
      <p className=" text-[10px] md:text-sm font-semibold text-gray-400 mb-3">
        Home &gt; Products &gt; {product.product.name}
      </p>
      <div className=" flex justify-center h-fit  items-center ">
        <div className=" flex flex-col lg:flex-row w-full xl:w-[1200px] h-fit md:p-4 gap-3 xl:gap-6">
          <div>
            <div className=" hidden xl:block">
              <Image
                // className=" h-[500px] w-[10rem] "
                width={500}
                src={product.product.images[0]}
                onClick={() => setVisible(true)}
              />
            </div>
            <div className=" hidden lg:block xl:hidden">
              <Image
                // className=" h-[500px] w-[10rem] "
                width={400}
                src={product.product.images[0]}
                onClick={() => setVisible(true)}
              />
            </div>
            <div className=" block lg:hidden">
              <Image
                // className=" h-[500px] w-[10rem] "
                width="100%"
                src={product.product.images[0]}
                onClick={() => setVisible(true)}
              />
            </div>
            <div
              style={{
                display: "none",
              }}
            >
              <Image.PreviewGroup
                preview={{
                  visible,
                  onVisibleChange: (vis) => setVisible(vis),
                }}
              >
                {product.product.images.map((e) => (
                  <Image src={e} />
                ))}
              </Image.PreviewGroup>
            </div>
          </div>

          <div className=" flex flex-col justify-between gap-2 w-full">
            <div className="  flex flex-col justify-between gap-1 md:gap-2  w-full">
              <p className=" font-extrabold text-2xl md:text-3xl mb-1 md:mb-6">
                {product.product.brand}
              </p>

              <p className=" font-normal text-[16px] md:text-xl card-link card-group">
                {product.product.name}
              </p>
              <p className=" text-[13px] md:text-[15px] text-gray-500 mb-1">
                Model No : {product.product.modelno}
              </p>
              <span>
                <p className=" font-bold text-[18px] md:text-xl">
                  ₹{product.product.price}
                </p>
                <p className=" text-gray-500 mt-[-3px] text-[14px] md:text-[15px] font-semibold">
                  Inclusive of all taxes
                </p>
              </span>
              {/* <div className=" flex justify-center items-center">
          <div className=" border grid place-content-center text-3xl h-10 w-10 bg-slate-100">
          -
          </div>
          <div className=" grid place-content-center w-10">5</div>
          <div className=" border grid place-content-center text-3xl h-10 w-10 bg-slate-100">
          +
          </div>
        </div> */}
              <p className="text-[18px] hidden lg:block text-gray-700 mt-1 w-full ">
                {product.product.description}
              </p>
            </div>
            <div>
              <div className=" flex mt-3 gap-3 mb-4 ">
                <button
                  onClick={() => handeladdcart(product.product._id)}
                  className=" bg-orange-500  h-12 w-full text-lg px-2 rounded-md text-white font-semibold"
                >
                  Add to cart
                </button>
                {/* <button className=" border-2 text-rahane   h-12 w-12 px-2 rounded-md  font-semibold">
                  <HeartOutlined
                    color="red"
                    size="lg"
                    className=" border-red-400"
                  />
                </button> */}
              </div>
              <div className=" text-gray-600 text-16 flex flex-col gap-1 ">
                <p>
                  <LockIcon fontSize="medium" /> 100% secure and safe
                  transaction
                </p>
                <p>
                  <SafetyOutlined style={{ fontSize: "24px" }} /> 100% genuine
                  products
                </p>
                <p>
                  {" "}
                  <VerifiedIcon /> Authorised dealers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center py-0 md:py-7 lg:py-10 ">
        <div className="  max-w-[1200px] py-5 ">
          <p className=" font-semibold uppercase  border-b-4 border-red-600 w-fit py-1">
            Specification
          </p>
        </div>
        <div className=" w-full flex sm:flex-row flex-col justify-between gap-2 md:gap-10 sm:flex-wrap">
          <span>
            <p className=" font-semibold text-gray-400 uppercase text-[14px] md:text-[16px]">
              Country Of Origin
            </p>
            <p className=" text-[13px] md:text-[15px] font-semibold">
              {product.product.country_of_origin}
            </p>
          </span>
          <span>
            <p className=" font-semibold text-gray-400 uppercase text-[14px] md:text-[16px]">
              WARRANTY PERIOD
            </p>
            <p className="text-[13px] md:text-[15px] font-semibold">
              {product.product.warranty} years
            </p>
          </span>
          <span>
            <p className=" font-semibold text-gray-400 uppercase text-[14px] md:text-[16px]">
              Model No
            </p>
            <p className=" text-[13px] md:text-[15px] font-semibold">
              {product.product.modelno}
            </p>
          </span>
          <span>
            <p className=" font-semibold text-gray-400 uppercase text-[14px] md:text-[16px]">
              Gender
            </p>
            <p className=" text-[13px] md:text-[15px] font-semibold">
              {product.product.gender}
            </p>
          </span>
          <span>
            <p className=" font-semibold text-gray-400 uppercase text-[14px] md:text-[16px]">
              Dial Color
            </p>
            <p className=" text-[13px] md:text-[15px] font-semibold">
              {product.product.dialcolor[0]}
            </p>
          </span>
          <span>
            <p className=" font-semibold text-gray-400 uppercase text-[14px] md:text-[16px]">
              Strap Color
            </p>
            <p className=" text-[13px] md:text-[15px] font-semibold">
              {product.product.strapColor[0]}
            </p>
          </span>
        </div>
        <p className=" font-semibold uppercase block lg:hidden  border-b-4 border-red-600 w-fit mt-3 py-1">
          Description
        </p>
        <p className="text-[16px] py-3 block lg:hidden text-gray-700 mt-1 w-full ">
          {product.product.description}
        </p>
      </div>
      <div className=" flex justify-center items-center flex-col">
        <p className=" text-black text-center font-semibold uppercase block  border-b-4 border-red-600 w-fit mt-3 py-1">
          Similar Products
        </p>
        <div>
          <SimilarProducts similar={product?.product?.strapColor[0]} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
