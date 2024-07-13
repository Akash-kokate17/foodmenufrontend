import React, { useRef } from "react";
import { postRotiBottleData } from "../FoodMenuApi";
import Swal from "sweetalert2";
import OrdersButton from "../veg_nonVeg_component/OrdersButton";

export default function RotiBevaragePage(props) {
  const rotiCout = useRef();
  const waterBottle = useRef();
  let tableNo = sessionStorage.getItem("tableNumber");
  console.log("number", tableNo);

  async function postRotiAndBottle() {
    try {
      const rotiCount = rotiCout.current.value;
      const bottleCount = waterBottle.current.value;

      if (rotiCount >= 1 || bottleCount >= 1) {
        await postRotiBottleData(parseInt(tableNo), rotiCount, bottleCount);
        Swal.fire("Data has been successfully sent");
      } else {
        Swal.fire("You Can't Enter Negative Value Or Zero");
      }
    } catch (error) {
      console.log("something went wrong to send data", error);
      Swal.fire("Something went wrong while sending data");
    }
  }

  return (
    <>
      <OrdersButton />
      <div className="text-start">
        <div>Your Table No :{tableNo}</div>
      </div>
      <table className="table text-center">
        <thead>
          <tr>
            <th>roti & Water Bottle</th>
            <th>Plz Enter Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Select Roti</td>
            <td>
              <input
                type="number"
                ref={rotiCout}
                className="rounded rounded-2 text-center"
              />
            </td>
          </tr>
          <tr>
            <td>Select Water Bottle</td>
            <td>
              <input
                type="number"
                ref={waterBottle}
                className="rounded rounded-2 text-center"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={postRotiAndBottle}>Submit</button>
    </>
  );
}
