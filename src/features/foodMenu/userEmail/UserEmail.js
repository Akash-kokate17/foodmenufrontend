import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UserEmail(props) {
  const emailRef = useRef();
  const navigate = useNavigate();

  const storeGmail = () => {
    const email = emailRef.current.value.toLowerCase();
    if (email === "" || !email.includes("@gmail.com")) {
      Swal.fire("plz Enter valid email")
    } else if (email.includes("@gmail.com")) {
      sessionStorage.setItem("email", email);
      navigate("/vegNonVegMenu");
    }
  };
  return (
    <>
      <div className="d-flex flex-column flex-wrap justify-content-center align-items-center w-100 vh-100 ">
        <div className="border border-2 col-sm-3 col-md-4 h-50 d-flex  align-items-center rounded rounded-3">
          <div className="w-100">
            <div className=" d-flex align-items-center justify-content-center">
              <input
                ref={emailRef}
                type="text"
                className=" form-control m-4 text-center"
                placeholder="Enter code"
              />
            </div>
            <div className="text-center">
              <button className="btn btn-primary" onClick={storeGmail}>
                Enter To Order LIst
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
