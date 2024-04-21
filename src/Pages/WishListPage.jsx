import React from "react";
import { useSelector } from "react-redux";
import Products from "../components/Products";
const WishListPage = () => {
  const WishlistItems = useSelector((state) => state.wishList);
  console.log("wishlist", WishlistItems);
  return (
    <div className=" px-3 lg:px-6">
      <p className=" text-[10px] md:text-sm font-semibold text-gray-400 my-4">
        Home &gt; Wishlist
      </p>
      <div className=" flex flex-wrap gap-3 items-center justify-center lg:justify-between lg:gap-6">
        {WishlistItems.items.map((itm) => (
          <Products data={itm} type=""></Products>
          // </NavLink>
        ))}
      </div>
    </div>
  );
};

export default WishListPage;
