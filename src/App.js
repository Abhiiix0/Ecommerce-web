import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Store from "./Pages/Store";
import Cart from "./Pages/Cart";
import Account from "./Pages/Account";
import PrivateUser from "./Routes/PrivateUser";
import { message } from "antd";
const App = () => {
  const { contextHolder } = message.useMessage();
  return (
    <>
      {contextHolder}
      <div className=" static z-50 border border-red">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/user" element={<PrivateUser />}>
          <Route path="account" element={<Account />}></Route>
        </Route>

        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/store" element={<Store />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
