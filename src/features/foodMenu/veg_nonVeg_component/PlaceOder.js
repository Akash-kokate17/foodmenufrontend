import React, { useState } from "react";
import { sendMail } from "../FoodMenuApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder(props) {
  const userEmail = sessionStorage.getItem("email");
  const [email, setEmail] = useState(userEmail);
  const tableNo = sessionStorage.getItem("tableNumber");
  console.log(tableNo);
  console.log(userEmail, "userEmail");

  const navigate = useNavigate();

  const SendMailOfOrder = async () => {
    if (tableNo) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want Place Order",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Place Order",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            Swal.fire({
              title: "Your Order Placed Successfully!",
              text: "Your Order List You Got On Gmail",
              icon: "success",
            });
            sendMail(tableNo, email);
            navigate("/vegNonVegMenu");
            setEmail(email);
          } catch (error) {
            Swal.fire({
              title: "Error",
              text: "There was an error sending your order email. Please try again.",
              icon: "error",
            });
          }
        }
      });
    }

    if (!tableNo) {
      alert("no table selected");
    }
  };

  return (
    <div className="d-flex flex-column w-100">
      <div className="d-flex justify-content-end align-items-end flex-grow-1 p-3">
        <button className="btn btn-dark" onClick={SendMailOfOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}
