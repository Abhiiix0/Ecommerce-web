import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { OtpCheckApi, forgotpass, passchngApi } from "../apis/Api";
import { useForm } from "react-hook-form";
const ForgetPassword = ({ FHide, setFHide }) => {
  const [email, setemail] = useState("");
  const [emailsent, setemailsent] = useState(false);
  const [otpcheckvalue, setotpcheckvalue] = useState(false);
  //to send email
  const setotpfun = async (email) => {
    setemail(email.email);
    try {
      const res = await forgotpass(email);
      const data = await res.json();
      if (data.success) {
        message.open({
          type: "success",
          content: data.message,
        });
        console.log(data);
        setemailsent(true);
      } else {
        message.open({
          type: "error",
          content: data.message,
        });
      }
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: error.message,
      });
    }
  };

  //to check otp
  const OtpCheckFun = async (otp) => {
    const payload = {
      email: email,
      otp: Number(otp),
    };
    console.log("payload", payload);
    try {
      const res = await OtpCheckApi(payload);
      const data = await res.json();
      if (data.success) {
        message.open({
          type: "success",
          content: data.message,
        });
        console.log(data);
        setotpcheckvalue(true);
      } else {
        message.open({
          type: "error",
          content: data.message,
        });
      }
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: error.message,
      });
    }
  };

  const passChangeFun = async (pass) => {
    const payload = {
      email: email,
      password: pass,
    };
    console.log("payload", payload);
    try {
      const res = await passchngApi(payload);
      const data = await res.json();
      if (data.success) {
        message.open({
          type: "success",
          content: data.message,
        });
        console.log("chng pass", data);
        setInterval(() => {
          setotpcheckvalue(false);
          setemailsent(false);
          setFHide(false);
          setemail("");
        }, 1000);
        setotpcheckvalue(true);
      } else {
        message.open({
          type: "error",
          content: data.message,
        });
      }
    } catch (error) {
      console.log(error);
      message.open({
        type: "error",
        content: error.message,
      });
    }
  };

  const { register, handleSubmit } = useForm();
  const { handleSubmit: handleSubmit2, register: register2 } = useForm();
  const { handleSubmit: handleSubmit3, register: register3 } = useForm();
  const handerlotpform = async (value) => {
    if (value === "") {
      message.open({
        type: "error",
        content: "please enter your email",
      });
    } else {
      setotpfun(value);
    }
    console.log(value);
  };

  const handerlOtpCheck = async (value) => {
    if (value === "") {
      message.open({
        type: "error",
        content: "please enter your OTP",
      });
    } else {
      OtpCheckFun(value.otp);
    }
    console.log(value);
  };

  const handerlpasschng = async (value) => {
    if (value === "") {
      message.open({
        type: "error",
        content: "please enter your new Password",
      });
    } else {
      passChangeFun(value.Password);
    }
    console.log(value);
  };
  return (
    <div>
      <Modal
        open={FHide}
        footer={false}
        width={350}
        onCancel={() => setFHide(!FHide)}
      >
        {!emailsent ? (
          <form
            onSubmit={handleSubmit(handerlotpform)}
            className="  flex flex-wrap gap-3 pt-8 pb-4 flex-col"
          >
            <input
              {...register("email")}
              className=" border text-lg font-normal rounded-md bg-slate-100 h-12 px-2"
              type="mail"
              placeholder="Enter your register email"
            />

            <button
              type="submit"
              className=" text-lg rounded-md border text-white font-semibold  bg-blue-600 h-12"
            >
              Submit
            </button>
          </form>
        ) : (
          <div>
            {!otpcheckvalue ? (
              <form
                onSubmit={handleSubmit2(handerlOtpCheck)}
                className="  flex flex-wrap gap-3 pt-8 pb-4 flex-col"
              >
                <input
                  {...register2("otp")}
                  className=" border text-lg font-normal rounded-md bg-slate-100 h-12 px-2"
                  type="number"
                  placeholder="Enter 6 Digit OTP"
                />

                <button
                  type="submit"
                  className=" text-lg rounded-md border text-white font-semibold  bg-blue-600 h-12"
                >
                  Submit
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit3(handerlpasschng)}
                className="  flex flex-wrap gap-3 pt-8 pb-4 flex-col"
              >
                <input
                  {...register3("Password")}
                  className=" border text-lg font-normal rounded-md bg-slate-100 h-12 px-2"
                  type="text"
                  placeholder="Enter your new Password"
                />

                <button
                  type="submit"
                  className=" text-lg rounded-md border text-white font-semibold  bg-blue-600 h-12"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ForgetPassword;
