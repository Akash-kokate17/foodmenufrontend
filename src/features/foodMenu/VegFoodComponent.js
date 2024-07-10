import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchVegFood,
  menuOderThunk,
  postOrderData,
  removeOrderData,
} from "../foodMenu/FoodMenuSlice";
import { allOderData } from "./FoodMenuApi";
import OrdersButton from "./veg_nonVeg_component/OrdersButton";

const VegFoodComponent = () => {
  const dispatch = useDispatch();
  const vegFood = useSelector((state) => state.vegFood.items);
  const menu = useSelector((state) => state.vegFood.menuOder) || { items: [] };

  const [selectedItems, setSelectedItems] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [filteredVegFood, setFilteredVegFood] = useState(vegFood);

  useEffect(() => {
    const saveTableNo = sessionStorage.getItem("tableNumber");
    const saveSelectedItem = JSON.parse(
      sessionStorage.getItem("selectedItemsVeg")
    );

    if (saveTableNo) setTableNumber(saveTableNo);
    if (saveSelectedItem) setSelectedItems(saveSelectedItem);

    dispatch(fetchVegFood());
    if (saveTableNo) {
      dispatch(menuOderThunk(saveTableNo));
    }
  }, [dispatch]);

  useEffect(() => {
    if (tableNumber) {
      dispatch(menuOderThunk(tableNumber));
    }
  }, [tableNumber, dispatch]);

  useEffect(() => {
    sessionStorage.setItem("tableNumber", tableNumber);
    sessionStorage.setItem(
      "selectedItemsVeg",
      JSON.stringify(selectedItems)
    );
  }, [tableNumber, selectedItems]);

  useEffect(() => {
    if (menu.items && menu.items.length > 0 && tableNumber) {
      setSelectedItems(menu.items);
    } else {
      setSelectedItems([]);
    }
  }, [menu.items, tableNumber, menu.tableNo]);

  useEffect(() => {
    setFilteredVegFood(vegFood); // Initialize filteredVegFood with vegFood on component load
  }, [vegFood]);

  const toggleSelectItem = (food) => {
    const isFoodInCart = selectedItems.some(
      (item) => item.dishName === food.dishName
    );
    if (!tableNumber) {
      Swal.fire("Please first select the table number!");
    } else {
      if (isFoodInCart) {
        const removeFoodFromCart = selectedItems.filter(
          (item) => item.dishName !== food.dishName
        );
        setSelectedItems(removeFoodFromCart);
        dispatch(
          removeOrderData({ tableNo: tableNumber, food: food.dishName })
        );
      } else {
        const updatedSelectedItem = [...selectedItems, food];
        setSelectedItems(updatedSelectedItem);
        dispatch(
          postOrderData({
            no: food.no,
            items: { dishName: food.dishName, price: food.price },
            tableNo: tableNumber,
          })
        ).then((response) => {
          if (response.error) {
            Swal.fire(response.error.message);
          }
        });
      }
    }
  };

  const selectTable = async (e) => {
    try {
      const value = parseInt(e.target.value, 10);
      let response = await allOderData();

      console.log("Fetched orders:", response);

      if (response.items && response.items.length > 0) {
        const findTableIsInOrder = response.items.some(
          (item) => item.tableNo === value
        );

        if (findTableIsInOrder) {
          Swal.fire("Table is already selected by someone else.");
        } else {
          sessionStorage.setItem("tableNumber", value); // Save the table number to session storage
          setTableNumber(value);
        }
      } else {
        sessionStorage.setItem("tableNumber", value); // Save the table number to session storage
        Swal.fire({
          title: `You Want To Select ${value} Table Number`,
          text: `Are you sure?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Select",
        }).then((result) => {
          if (result.isConfirmed) {
            setTableNumber(value);
            dispatch(
              postOrderData({
                no: null ,
                items: { dishName: "", price: null },
                tableNo: value,
              })
            );
          }
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const isItemSelected = (food) => {
    return selectedItems.some((item) => item.dishName === food.dishName);
  };

  const searchItemResult = (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log(searchValue);
    let find = vegFood.filter((item) =>
      item.dishName.toLowerCase().includes(searchValue)
    );
    setFilteredVegFood(find);
  };

  return (
    <>
    <OrdersButton/>
      <select onChange={selectTable} value={tableNumber}>
        <option value="" disabled>
          {`Select table number ${tableNumber ? `: ${tableNumber}` : ""}`}
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <div className="flex flex-wrap w-100 mt-4 mb-4">
        <div className="flex justify-content-center align-items-center w-100">
          <div className="text-center flex justify-content-center align-items-center w-100">
            <input
              placeholder="Search Your Fav Food"
              className="text-center rounded rounded-5 w-75"
              onChange={(e) => {
                searchItemResult(e);
              }}
            />
          </div>
        </div>
      </div>

      <table className="table-responsive table-hover text-center border border-2 w-100">
        <thead>
          <tr>
            <th>No</th>
            <th>Dish Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredVegFood.map((food) => (
            <tr
              key={food._id}
              onClick={() => toggleSelectItem(food)}
              style={{
                backgroundColor: isItemSelected(food) ? "lightblue" : "white",
                cursor: "pointer",
              }}
              className="border border-2"
            >
              <td className="p-2">{food.no}</td>
              <td className="p-2">{food.dishName}</td>
              <td className="p-2">{food.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default React.memo(VegFoodComponent);
