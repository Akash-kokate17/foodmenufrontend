import React from "react";
import { Link } from "react-router-dom";

export default function OrdersButton(props) {
  return (
    <>
      <div className="container-fluid d-flex w-100 position-sticky top-0">
        <div className="w-100 text-end mt-3 ">
          <Link to="/orderList">
            <button className="btn btn-success me-2 m-1">Your Order</button>
          </Link>
        </div>
      </div>
    </>
  );
}
