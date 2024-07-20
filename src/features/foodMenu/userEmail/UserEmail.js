import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sendOtpMail } from "../FoodMenuApi";

export default function UserEmail() {
  const [flag, setFlag] = useState(true);
  const [otp, setOtp] = useState();
  const emailRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();

  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const storeGmail = async () => {
    let email = emailRef.current.value.toLowerCase();
    if (email === "" || !email.includes("@gmail.com")) {
      Swal.fire("Please enter a valid Gmail address.");
    } else {
      sessionStorage.setItem("email", email);
      let otp = generateOTP();
      setOtp(otp);
      console.log(otp, "otp");
      await sendOtpMail(otp, email);
      email = emailRef.current.value = "";
      setFlag(false);
    }
  };

  // verifyOtp() for verify otp

  const verifyOtp = () => {
    
  };
  return (
    <div className="d-flex flex-column flex-wrap justify-content-center align-items-center w-100 vh-100">
      {flag ? (
        <div className="border border-2 col-sm-3 col-md-4 h-50 d-flex align-items-center rounded rounded-3">
          <div className="w-100">
            <h2 className="text-center">
              You Get Your Order List On Your Gmail So Please Add Gmail.
            </h2>
            <div className="d-flex align-items-center justify-content-center">
              <input
                ref={emailRef}
                type="text"
                className="form-control m-4 text-center"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="text-center">
              <button className="btn btn-primary" onClick={storeGmail}>
                Enter To Order List
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-2 col-sm-3 col-md-4 h-50 d-flex align-items-center rounded rounded-3">
          <div className="w-100">
            <h2 className="text-center">
              An OTP has been sent to your email. Please enter the OTP below.
            </h2>
            <div className="d-flex align-items-center justify-content-center">
              <input
                ref={otpRef}
                type="text"
                className="form-control m-4 text-center"
                placeholder="Enter OTP"
              />
            </div>
            <div className="text-center">
              <button className="btn btn-primary" onClick={verifyOtp}>
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
