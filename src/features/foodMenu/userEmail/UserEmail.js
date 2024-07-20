import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sendOtpMail } from "../FoodMenuApi";

export default function UserEmail() {
  const [flag, setFlag] = useState(true);
  const [otp, setOtp] = useState();
  const [uEmail,setUEmail] = useState();
  const emailRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();

  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const storeGmail = async () => {
    let email = emailRef.current.value.toLowerCase();
    if (email === "" || !email.includes("@gmail.com")) {
      Swal.fire("Please enter a valid Gmail address.");
    } else {
      sessionStorage.setItem("email", email);
      setUEmail(email)
      let otp = generateOTP();
      console.log(otp);
      setOtp(otp);
      try {
        setFlag(false);
        emailRef.current.value = "";
        await sendOtpMail(otp, uEmail);
      } catch (error) {
        console.log("error to send mail");
      }
    }
  };

  // verifyOtp() for verify otp

  const verifyOtp = async () => {
    console.log("working");
    let userOtp = otpRef.current.value;
    if (parseInt(userOtp) === parseInt(otp)) {
      navigate("/vegNonVegMenu");
    } else {
      Swal.fire({
        title: "Otp is Incorrect",
        text: "Click Yes , To Generate Otp Again",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, create otp again!",
      }).then(async(result) => {
        if (result.isConfirmed) {
          let genarateOtpAgain = generateOTP();
          setOtp(genarateOtpAgain);
          console.log(genarateOtpAgain,"newOtp")
          Swal.fire({
            title: "successful",
            text: "New Otp Send Successfully",
            icon: "success",
          });
          await sendOtpMail(genarateOtpAgain, uEmail);
        }
      });
    }
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
