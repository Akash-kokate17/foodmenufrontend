  import React, { useEffect, useState } from "react";
  import { allOderData, removeOrder } from "../FoodMenuApi";

  export default function AllPlaceOrder() {
    const [allOrder, setAllOrder] = useState([]);

    async function fetchAllOrder() {
      try {
        let response = await allOderData();
        let filteredOrders = response.map((order) => ({
          ...order,
          items: order.items.filter((item) => item.dishName !== ""),
        }));
        console.log(filteredOrders, "filter");
        setAllOrder(filteredOrders);
      } catch (err) {
        console.log(err, "something went wrong to fetch allOrder Data");
      }
    }

    useEffect(() => {
      fetchAllOrder();
    }, []);

    // deleteFood for deleting the specific food

    const deleteFood = (dishName, tableNo) => {
      let dish = dishName;
      let table = tableNo;
      const deleteOrder = allOrder.map((order)=>{
        if(order.tableNo === tableNo){
          return {
            ...order,
            items : order.items.filter((item)=>item.dishName !== dishName),
          };
        }
        return order;
      })
      setAllOrder(deleteOrder)
      removeOrder(table,dish)
    }
    console.log(allOrder, "allOrder from order");

    return (
      <>
        <div className="flex flex-column flex-wrap w-100">
          <div className="flex flex-column w-100">
            <table className="table">
              <thead className="text-center">
                <tr>
                  <th>Table No</th>
                  <th>Dish Name</th>
                  <th>Price</th>
                  <th>Delete Order</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {allOrder.map((order) =>
                  order.items.map((item, index) => (
                    <tr key={`${order._id}-${index}`} className="">
                      <td>{order.tableNo}</td>
                      <td>{item.dishName}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteFood(item.dishName, order.tableNo);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
