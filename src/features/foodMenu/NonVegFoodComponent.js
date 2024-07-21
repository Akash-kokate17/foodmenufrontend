import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchNonVegFood,
  menuOderThunk,
  postOrderData,
  removeOrderData,
} from "../foodMenu/FoodMenuSlice";
import { allOderData } from "./FoodMenuApi";
import OrdersButton from "./veg_nonVeg_component/OrdersButton";

const NonVegFoodComponent = () => {
  const dispatch = useDispatch();
  const nonVegFood = useSelector((state) => state.vegFood.nonVegItems);
  const menu = useSelector((state) => state.vegFood.menuOder) || { items: [] };
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [filteredNonVegFood, setFilteredNonVegFood] = useState(nonVegFood);


  useEffect(() => {
    const saveTableNo = sessionStorage.getItem("tableNumber");
    const saveSelectedItem = JSON.parse(
      sessionStorage.getItem("selectedItems")
    );

    if (saveTableNo) setTableNumber(saveTableNo);
    if (saveSelectedItem) setSelectedItems(saveSelectedItem);

    dispatch(fetchNonVegFood());
    if (saveTableNo) {
      dispatch(menuOderThunk(saveTableNo));
    }
  }, [dispatch]);

  useEffect(() => {
    sessionStorage.setItem("tableNumber", tableNumber);
    sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [tableNumber, selectedItems]);

  useEffect(() => {
    if (tableNumber) {
      dispatch(menuOderThunk(tableNumber));
    }
  }, [tableNumber, dispatch]);

  useEffect(() => {
    if (menu.items && menu.items.length > 0) {
      setSelectedItems(menu.items);
    } else {
      setSelectedItems([]);
    }
  }, [menu.items, tableNumber]);

  useEffect(() => {
    setFilteredNonVegFood(nonVegFood); // Initialize filteredVegFood with vegFood on component load
  }, [nonVegFood]);

  const toggleSelectItem = (food) => {
    const isFoodInCart = selectedItems.some(
      (item) => item.dishName === food.dishName
    );
    if (!tableNumber) {
      Swal.fire("Please First Select The Table Number!");
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
            setSelectedItems(selectedItems);
            Swal.fire(response.error.message);
          }
        });
      }
    }
  };

  const isItemSelected = (food) => {
    return selectedItems.some((item) => item.dishName === food.dishName);
  };

  const selectTable = async (e) => {
    try {
      const value = parseInt(e.target.value, 10);
      let response = await allOderData();

      if (response.items && response.items.length > 0) {
        let check = response.items.some((item) => item.tableNo === value);

        if (check) {
          Swal.fire("table is already selected");
        } else {
          setTableNumber(value);
          sessionStorage.setItem("tableNumber", value);
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
                no: null,
                items: { dishName: "", price: null },
                tableNo: value,
              })
            );
          }
        });
      }
    } catch (err) {
      console.log("something went wrong to select table number");
    }
  };

  if (!nonVegFood) {
    return <div>Loading...</div>; // Handle loading state
  }

  const searchItemResult = (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log(searchValue);
    let find = nonVegFood.filter((item) =>
      item.dishName.toLowerCase().includes(searchValue)
    );
    setFilteredNonVegFood(find);
  };

  return (
    <>
     <OrdersButton/>
     <div className="d-flex justify-content-end mt-3 me-3">
     <select onChange={selectTable} value={tableNumber} className="rounded rounded-4 ms-2 p-1">
        <option value="" disabled>
          {`Select table number ${tableNumber ? `: ${tableNumber}` : ""}`}
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
     </div>

      <div className="flex flex-wrap w-100 mt-4 mb-4">
        <div className="flex justify-content-center align-items-center w-100">
          <div className="text-center flex justify-content-center align-items-center w-100">
            <input
              placeholder="Search Your Fav Food"
              className="text-center w-75"
              onChange={(e) => {
                searchItemResult(e);
              }}
              style={{outline:"none",border:"none", borderBottom:"2px solid black"}}
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
          {filteredNonVegFood.map((food) => (
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

export default React.memo(NonVegFoodComponent);
