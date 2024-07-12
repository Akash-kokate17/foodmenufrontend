import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import VegFoodComponent from "./features/foodMenu/VegFoodComponent";
import OrderList from "./features/foodMenu/OrderList";
import NonVegFoodComponent from "./features/foodMenu/NonVegFoodComponent";
import VegNonVeg from "./features/foodMenu/veg_nonVeg_component/VegNonVeg";
import OwnerPasswordCheck from "./features/foodMenu/ownerLogin/OwnerPasswordCheck";
import AllPlaceOrder from "./features/foodMenu/allPlaceOrder/AllPlaceOrder";
import UserEmail from "./features/foodMenu/userEmail/UserEmail";
import RotiBevaragePage from "./features/foodMenu/rotiBevarage/RotiBevaragePage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<UserEmail/>}/>
        <Route exact path="/vegNonVegMenu" element={<VegNonVeg />} />
        <Route exact path="/vegMenu" element={<VegFoodComponent />} />
        <Route exact path="/nonVegMenu" element={<NonVegFoodComponent />} />
        <Route exact path="/orderList" element={<OrderList />} />
        <Route exact path="/ownerLogin" element={<OwnerPasswordCheck />} />
        <Route exact path="/allOrder" element={<AllPlaceOrder/>}/>
        <Route exact path="/rotiBevarage" element={<RotiBevaragePage/>}/>
      </Routes>
    </>
  );
}

export default App;
