import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../apis/Api";
import { Image } from "antd";
const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetSingleProduct(slug); // Assuming your API endpoint is '/api/products/:slug'
        console.log("data", response);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        console.log("data", data);
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
    <div className=" flex gap-4">
      <div>
        <Image
          className=" h-[500px] m-4"
          preview={{
            visible: false,
          }}
          width={500}
          src={product.product.images[0]}
          onClick={() => setVisible(true)}
        />
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

      <div>
        <p className=" font-normal text-xl">{product.product.brand}</p>

        <p className=" font-normal text-xl">{product.product.name}</p>
        <p className=" text-[16px]">{product.product.modelno}</p>
        <p className=" font-bold">₹{product.product.price}</p>
        <div className=" flex justify-center items-center">
          <div className=" border grid place-content-center text-3xl h-10 w-10 bg-slate-100">
            -
          </div>
          <div className=" grid place-content-center w-10">5</div>
          <div className=" border grid place-content-center text-3xl h-10 w-10 bg-slate-100">
            +
          </div>
        </div>
        <p>{product.product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
