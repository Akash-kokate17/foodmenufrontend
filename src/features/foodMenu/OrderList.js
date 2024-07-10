import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuOderThunk } from "../foodMenu/FoodMenuSlice";
import PlaceOrder from "./veg_nonVeg_component/PlaceOder";

const OrderList = () => {
  const menu = useSelector((state) => state.vegFood.menuOder);
  const dispatch = useDispatch();

  // useEffect for fetch the order data accordingly table number;
  const tableNumber = sessionStorage.getItem("tableNumber");
  useEffect(() => {
    if (tableNumber) {
      dispatch(menuOderThunk(tableNumber))
        .catch(error => {
          console.error('Failed to fetch menu orders', error);
        });
    }
  },[dispatch,tableNumber]);

  console.log("menu", menu);

  // Ensure menu is defined and has items array before mapping
  if (!menu || !menu.items || !Array.isArray(menu.items) || menu.items.length === 0) {
    return (
      <div>
        <h1>Order List</h1>
        <div>No menu available</div>
      </div>
    );
  }

  return (
  <>
    <div>
      <h1>Order List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Dish Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {menu.items.map((item) => (
            <tr key={item.dishName}>
              <td>{item.dishName}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
          <PlaceOrder/>
    </div>
  </>
  );
};

export default OrderList;
