import React, { useEffect, useState } from "react";
import { deleteRotiAndBottle, getAllRotiBottleTableNo } from "../FoodMenuApi";

export default function AllRotiBottleCount(props) {
  const [rotiBottleCount, setRotiBottleCount] = useState([]);

  async function getAllRotiBottleCount() {
    try {
      let response = await getAllRotiBottleTableNo();
      setRotiBottleCount(response);
    } catch (error) {
      console.log(
        "something went wrong to get roti & bottle count in allPlaceOrder",
        error
      );
    }
  }

  useEffect(() => {
    getAllRotiBottleCount();
  }, []);

  console.log("roti bottle data", rotiBottleCount);

  // Calculate total counts
  const calculateTotalCounts = () => {
    return rotiBottleCount.map((order) => {
      const totalRoti = order.roti.reduce(
        (acc, item) => acc + item.rotiCount,
        0
      );
      const totalBottle = order.bottle.reduce(
        (acc, item) => acc + item.bottleCount,
        0
      );
      return {
        tableNo: order.tableNo,
        totalRoti,
        totalBottle,
      };
    });
  };

  const totals = calculateTotalCounts();
  console.log(totals, "totals");

  let deleteTableNoData = async (tableNumber) => {
    try {
      let tableNo = parseInt(tableNumber);
      let response = await deleteRotiAndBottle(tableNo);
      console.log(response, "response");
    } catch (error) {
      console.log("something went wrong to delete");
    }
  };

  return (
    <>
      <table className="table table-bordered table-responsive table-hover text-center mb-4 table-striped">
        <thead>
          <tr>
            <th>Table Number</th>
            <th>Total Roti</th>
            <th>Total Bottle</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {totals.map((total, index) => (
            <tr key={index}>
              <td>{total.tableNo}</td>
              <td>{total.totalRoti}</td>
              <td>{total.totalBottle}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTableNoData(total.tableNo)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
