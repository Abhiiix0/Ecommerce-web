import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const PrivateUser = () => {
  const auth = useSelector((state) => state.auth.token);
  const [ok, setok] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(auth);
    const autocheck = async () => {
      const res = await fetch(
        "https://finalyeartyproject-production.up.railway.app/api/v1/auth/user-auth",
        {
          headers: {
            Authorization: `${auth}`,
          },
        }
      );
      console.log("response", res);
      if (res.ok) {
        setok(true);
        navigate("account");
      } else {
        setok(false);
      }
    };

    autocheck();
  }, [auth]);

  return ok ? <Outlet /> : <Spinner path="/" />;
};

export default PrivateUser;
