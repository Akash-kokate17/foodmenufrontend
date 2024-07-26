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

  // Format counts
  const formatCounts = (items, countKey) => {
    return items.map((item) => item[countKey]).join(" + ");
  };

  const formatTotalCounts = () => {
    return rotiBottleCount.map((order) => {
      const rotiCounts = formatCounts(order.roti, "rotiCount");
      const bottleCounts = formatCounts(order.bottle, "bottleCount");
      return {
        tableNo: order.tableNo,
        rotiCounts,
        bottleCounts,
      };
    });
  };

  const formattedTotals = formatTotalCounts();
  console.log(formattedTotals, "formattedTotals");

  let deleteTableNoData = async (tableNumber) => {
    try {
      let tableNo = parseInt(tableNumber);
      let response = await deleteRotiAndBottle(tableNo);
      getAllRotiBottleCount();
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
            <th>Roti Orders</th>
            <th>Bottle Orders</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {formattedTotals.map((total, index) => (
            <tr key={index}>
              <td>{total.tableNo}</td>
              <td>{total.rotiCounts}</td>
              <td>{total.bottleCounts}</td>
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
