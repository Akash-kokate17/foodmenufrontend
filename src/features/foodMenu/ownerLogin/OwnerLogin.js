import React from "react";
import { Link } from "react-router-dom";

export default function OwnerLogin(props) {
  return <>
 <div className="container-fluid d-flex mb-2">
    <div className="w-100 text-end mt-3"  >
 <Link to="/ownerLogin">
     <button className="btn btn-success me-2 m-1 fw-bold">Owner Login</button>
 </Link>
    </div>
  </div>
  </>;
}
