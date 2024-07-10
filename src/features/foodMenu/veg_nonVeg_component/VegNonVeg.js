import React from "react";
import { TiArrowRightOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import OwnerLogin from "../ownerLogin/OwnerLogin";

export default function VegNonVeg(props) {
  return (
    <>
    <OwnerLogin/>
      <div className="container d-flex justify-content-center align-items-center vh-100 w-100" style={{ cursor: "pointer" }}>
        <div className="row w-100">
          <div className="col-12 col-md-6 mb-4">
            <Link to="/vegMenu" className="text-decoration-none">
              <div className="border border-2 p-2 rounded rounded-5 h-100">
                <div className="text-center">
                  <img
                    src="https://img.freepik.com/premium-photo/indian-hindu-veg-thali-also-known-as-food-platter-is-complete-lunch-dinner-meal-closeup-selective-focus_466689-9137.jpg?w=2000"
                    alt="vegThaliPhoto"
                    className="img-fluid rounded rounded-5"
                  />
                  <p className="border border-bottom-2 mt-5 border-black"></p>
                  <p className="text-dark">CLICK HERE FOR VEG MENU</p>
                  <p><TiArrowRightOutline className="fs-5 text-dark" /></p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <Link to="/nonVegMenu" className="text-decoration-none">
              <div className="border border-2 p-2 rounded rounded-5 h-100">
                <div className="text-center">
                  <img
                    src="https://th.bing.com/th/id/OIP.4fEmjx3ji0bfDxVNPnfcKAHaG6?rs=1&pid=ImgDetMain"
                    alt="nonVegThaliPhoto"
                    className="img-fluid rounded rounded-5"
                  />
                  <p className="border border-bottom-2 mt-2 border-black"></p>
                  <p className="text-dark">CLICK HERE FOR NONVEG MENU</p>
                  <p><TiArrowRightOutline className="fs-5 text-dark" /></p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
