import React, { useRef } from "react";
import Swal from "sweetalert2";
import OrdersButton from "../veg_nonVeg_component/OrdersButton";
import { postRotiBottleDataInBody } from "../FoodMenuApi";

export default function RotiBeveragePage() {
  const rotiCountRef = useRef();
  const waterBottleRef = useRef();
  let tableNo = sessionStorage.getItem("tableNumber");
  console.log("number", tableNo);

  async function postRotiAndBottle() {
    try {
      let rotiCount = parseInt(rotiCountRef.current.value) || 0;
      let bottleCount = parseInt(waterBottleRef.current.value) || 0;
 
       if(!tableNo){
        Swal.fire("plz first select table number in veg or nonveg item selector");
        return;
       }
      if (rotiCount >= 0 && bottleCount >= 0) {
        const PostOrderData = {
          tableNo: tableNo,
          rotiCount: rotiCount || 0,
          bottleCount: bottleCount || 0,
        };
        Swal.fire({
          title: "Are you sure?",
          text: `Your Roti ${rotiCount} And ${bottleCount} is set to YOur Order`,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then(async(result) => {
          if (result.isConfirmed) {
            await postRotiBottleDataInBody(PostOrderData);
            Swal.fire({
              title: "Success",
              text: "Your order is set to Your order ",
              icon: "success"
            });
          }
        });
      } else {
        Swal.fire("Plz Don't Enter Negative Value");
      }
    } catch (error) {
      console.log("Something went wrong to send data", error);
      Swal.fire("Something went wrong while sending data");
    }
  }

  return (
    <>
      <OrdersButton />
      <div className="text-start">
        <div>Your Table No: {tableNo}</div>
      </div>
      <table className="table text-center">
        <thead>
          <tr>
            <th>Roti & Water Bottle</th>
            <th>Please Enter Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Select Roti</td>
            <td>
              <input
                type="number"
                ref={rotiCountRef}
                className="rounded rounded-2 text-center"
              />
            </td>
          </tr>
          <tr>
            <td>Select Water Bottle</td>
            <td>
              <input
                type="number"
                ref={waterBottleRef}
                className="rounded rounded-2 text-center"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-100 d-flex justify-content-end align-items-end pe-4">
      <button onClick={postRotiAndBottle} className="btn btn-primary">Submit</button>
      </div>
    </>
  );
}
