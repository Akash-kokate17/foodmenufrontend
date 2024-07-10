import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OwnerPasswordCheck(props) {
    const useRefCheck = useRef()
    const navigate = useNavigate()

    const checkCode = () =>{
        let value = useRefCheck.current.value
        if(value === "hotel code"){
         navigate("/allOrder")
        }else{
            alert("password key is incorrect")
        }
    }
  return (
    <>
      <div className="d-flex flex-column flex-wrap justify-content-center align-items-center w-100 vh-100 ">
        <div className="border border-2 col-sm-3 col-md-4 h-50 d-flex  align-items-center rounded rounded-3">
          <div className="w-100">
          <div className=" d-flex align-items-center justify-content-center">
            <input ref={useRefCheck} type="text" className=" form-control m-4 text-center" placeholder="Enter code"/>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={checkCode}>Enter To Order LIst</button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
