import React, { useRef } from "react";
import { postRotiBottleData } from "../FoodMenuApi";
import Swal from "sweetalert2";

export default function RotiBevaragePage(props) {
  // const [roti, setRoti] = useState(0);
  // const [bottle, setBottle] = useState(0);

  const rotiCout = useRef();
  const waterBottle = useRef();
  let tableNo = sessionStorage.getItem("tableNumber");
  console.log("number", tableNo);

  async function postRotiAndBottle() {
    try {
      const rotiCount = parseInt(rotiCout.current.value, 10);
      const bottleCount = parseInt(waterBottle.current.value, 10);

      if (rotiCount >= 1 && bottleCount >= 1) {
        // setRoti(rotiCount);
        // setBottle(bottleCount);

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
      <table className="table text-center">
        <thead>
          <tr>
            <th>roti</th>
            <th>water bottle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Select Roti</td>
            <td>
              <input
                type="text"
                ref={rotiCout}
                className="rounded rounded-2 text-center"
              />
            </td>
          </tr>
          <tr>
            <td>Select Water Bottle</td>
            <td>
              <input
                type="text"
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
