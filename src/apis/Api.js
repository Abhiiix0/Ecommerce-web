// import { UseSelector, useSelector } from "react-redux";
const baseurl = "https://finalyeartyproject-production.up.railway.app";
// const token = useSelector((state) => state.auth.token);
export const loginAPi = (value) => {
  return fetch(`${baseurl}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const RegisterAPi = (value) => {
  return fetch(`${baseurl}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const UserDataUpate = (value, token) => {
  return fetch(`${baseurl}/api/v1/auth/update-user`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const getAllProducts = () => {
  return fetch(
    "https://finalyeartyproject-production.up.railway.app/api/v1/product/get-product"
  );
};

export const GetSingleProduct = (slug) => {
  return fetch(`${baseurl}/api/v1/product/get-single-product/${slug}`);
};
