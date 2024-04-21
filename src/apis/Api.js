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

//forgot password
export const forgotpass = (value) => {
  return fetch(`${baseurl}/api/v1/auth/forget-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

//forgot password otp check
export const OtpCheckApi = (value) => {
  return fetch(`${baseurl}/api/v1/auth/forget-password-otp-check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

//pass change
export const passchngApi = (value) => {
  return fetch(`${baseurl}/api/v1/auth/reset-password`, {
    method: "PUT",
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
export const getSpecificProducts = (id) => {
  console.log(
    `https://finalyeartyproject-production.up.railway.app/api/v1/auth/product-filters?=${id}`
  );
  return fetch(
    `https://finalyeartyproject-production.up.railway.app/api/v1/product/product-filters?category=${id}`
  );
};

export const getSearchProducts = (name, token) => {
  return fetch(
    `https://finalyeartyproject-production.up.railway.app/api/v1/auth/search?q=${name}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
};

export const GetSingleProduct = (slug) => {
  return fetch(`${baseurl}/api/v1/product/get-single-product/${slug}`);
};

export const addToCartController = (value, token) => {
  return fetch(`${baseurl}/api/v1/auth/add-to-cart`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const IncCartItemQty = (value, token) => {
  return fetch(`${baseurl}/api/v1/auth/cart-increse-quantity`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const DeleteCartItems = (value, token) => {
  console.log(value, token);
  return fetch(`${baseurl}/api/v1/auth/remove-from-cart`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const IncCartItems = (value, token) => {
  console.log(value, token);
  return fetch(`${baseurl}/api/v1/auth/cart-increase-quantity`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const DecCartItems = (value, token) => {
  console.log(value, token);
  return fetch(`${baseurl}/api/v1/auth/cart-decrease-quantity`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const getAllUserOrder = (id, token) => {
  console.log(id, token);
  return fetch(`${baseurl}/api/v1/auth/get-order/:${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
};
