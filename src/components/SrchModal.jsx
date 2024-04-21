import React from "react";
import { Modal } from "antd";
import { useState } from "react";
import { getSearchProducts } from "../apis/Api";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const SrchModal = ({ open, sethide }) => {
  const [srchdata, setsrchdata] = useState([]);
  const [srchEmptydata, setsrchEmptydata] = useState(true);

  const auth = useSelector((state) => state.auth);
  const searchfromInput = async (dataname) => {
    try {
      if (dataname === "") {
        setsrchEmptydata(false);
        setsrchdata([]);
      } else {
        setsrchEmptydata(true);
        const res = await getSearchProducts(dataname, auth.token);
        const data = await res.json();
        console.log(data);
        setsrchdata(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal open={open} footer={false} onCancel={() => sethide(false)}>
        <div className=" mt-7 px-2">
          <input
            className=" outline-none px-2 py-2 h-12 mb-2 text-[16px] rounded-md bg-slate-200 w-full"
            placeholder="Search Here..."
            type="text"
            onChange={(e) => {
              searchfromInput(e.target.value);
            }}
          />
          {srchEmptydata ? (
            <>
              {srchdata.length !== 0 ? (
                <div className=" h-[280px] overflow-hidden ">
                  {srchdata.map((p) => (
                    <NavLink
                      onClick={() => sethide(false)}
                      to={`/products/${p.slug}`}
                      className=" mb-2 border flex gap-2 items-center p-2 rounded-md w-full bg-slate-50 "
                    >
                      <img src={p.images[0]} className=" w-8 h-8" alt="" />
                      <p className=" font-normal text-lg w-full overflow-hidden whitespace-nowrap  text-ellipsis">
                        {p.name}
                      </p>
                    </NavLink>
                  ))}
                </div>
              ) : (
                <div>
                  <p className=" font-semibold">No Product found</p>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SrchModal;
