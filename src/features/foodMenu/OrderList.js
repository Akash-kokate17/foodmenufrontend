import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuOderThunk } from "../foodMenu/FoodMenuSlice";
import PlaceOrder from "./veg_nonVeg_component/PlaceOder";
import { getAllRotiBottleTableNo } from "./FoodMenuApi";

const OrderList = () => {
  const menu = useSelector((state) => state.vegFood.menuOder);
  const [rotiBottle, setRotiBottle] = useState([]);
  const dispatch = useDispatch();

  // useEffect for fetch the order data accordingly table number;
  const tableNumber = sessionStorage.getItem("tableNumber");
  useEffect(() => {
    if (tableNumber) {
      dispatch(menuOderThunk(tableNumber)).catch((error) => {
        console.error("Failed to fetch menu orders", error);
      });
    }
  }, [dispatch, tableNumber]);

  console.log("menu", menu);

  async function getRotiBottle() {
    try {
      let response = await getAllRotiBottleTableNo();
      setRotiBottle(response);
    } catch (error) {
      console.log("something went wrong to fetch Roti and Bottle Data");
    }
  }

  useEffect(() => {
    getRotiBottle();
  }, []);

  const totalRotiOrdered = rotiBottle
  .filter((data) => parseInt(data.tableNo, 10) === parseInt(tableNumber, 10))
  .reduce(
    (acc, obj) =>
      acc +
      obj.roti.reduce((sum, rotiObj) => sum + (rotiObj.rotiCount || 0), 0),
    0
  );

const totalBottleOrdered = rotiBottle
  .filter((data) => parseInt(data.tableNo, 10) === parseInt(tableNumber, 10))
  .reduce(
    (acc, obj) =>
      acc +
      obj.bottle.reduce(
        (sum, bottleObj) => sum + (bottleObj.bottleCount || 0),
        0
      ),
    0
  );


  // Ensure menu is defined and has items array before mapping
  if (
    !menu ||
    !menu.items ||
    !Array.isArray(menu.items) ||
    menu.items.length === 0
  ) {
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
        <h1>Order List Of Table No : {tableNumber}</h1>
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
        <p className="fw-bold">Total Roti Ordered :{totalRotiOrdered}</p>
        <p className="fw-bold">Total Bottle Ordered :{totalBottleOrdered}</p>
        <PlaceOrder />
      </div>
    </>
  );
};

export default OrderList;
