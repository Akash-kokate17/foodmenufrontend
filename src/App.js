import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import VegFoodComponent from "./features/foodMenu/VegFoodComponent";
import OrderList from "./features/foodMenu/OrderList";
import NonVegFoodComponent from "./features/foodMenu/NonVegFoodComponent";
import Veg_NonVeg from "./features/foodMenu/veg_nonVeg_component/Veg_NonVeg";
import OwnerPasswordCheck from "./features/foodMenu/ownerLogin/OwnerPasswordCheck";
import AllPlaceOrder from "./features/foodMenu/allPlaceOrder/AllPlaceOrder";
import UserEmail from "./features/foodMenu/userEmail/UserEmail";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<UserEmail/>}/>
        <Route exact path="/vegNonVegMenu" element={<Veg_NonVeg />} />
        <Route exact path="/vegMenu" element={<VegFoodComponent />} />
        <Route exact path="/nonVegMenu" element={<NonVegFoodComponent />} />
        <Route exact path="/orderList" element={<OrderList />} />
        <Route exact path="/ownerLogin" element={<OwnerPasswordCheck />} />
        <Route exact path="/allOrder" element={<AllPlaceOrder/>}/>
      </Routes>
    </>
  );
}

export default App;
