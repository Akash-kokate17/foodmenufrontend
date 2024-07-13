import axios from "axios";

export async function vegFood() {
  try {
    let response = await axios.get("https://foodmenubackend.onrender.com/veg");
    return response.data;
  } catch (error) {
    console.log("something went wrong to fetch vegFood", error);
    throw error;
  }
}

export async function nonVegFood() {
  try {
    let response = await axios.get(
      "https://foodmenubackend.onrender.com/nonVeg"
    );
    return response.data;
  } catch (err) {
    console.log("something went wrong to fetch nonVegFood", err);
  }
}

export async function orderMenuData(order) {
  try {
    let response = await axios.post(
      "https://foodmenubackend.onrender.com/orderMenuData",
      order
    );
    return response.data;
  } catch (err) {
    console.log("something went wrong to post orderMenuData", err);
  }
}

export async function removeOrder(tableNo, food) {
  try {
    let response = await axios.delete(
      `https://foodmenubackend.onrender.com/${tableNo}/${food}`
    );
    return response.data;
  } catch (err) {
    console.log("something went wrong to remove order data", err);
  }
}

export async function deleteAllData(tableNo) {
  try {
    let response = await axios.delete(
      `https://foodmenubackend.onrender.com/deleteAllOrder/${tableNo}`
    );
    return response.data;
  } catch (error) {
    console.log("something went wrong to remove order data", error);
  }
}
export async function register(userData) {
  try {
    await axios.post(
      "https://foodmenubackend.onrender.com/api/register",
      userData
    );
  } catch (err) {
    console.log("something went wrong to post register", err);
  }
}

export async function login(userData) {
  try {
    let response = await axios.post(
      "https://foodmenubackend.onrender.com/api/login",
      userData
    );
    return response.data;
  } catch (err) {
    console.log("something went wrong to login", err);
  }
}

export async function orders(token) {
  try {
    let response = await axios.get(
      "https://foodmenubackend.onrender.com/api/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("something went wrong to getting orders data", err);
  }
}

// menuOrder for showing the data to selecting table number vice on UI.
export async function menuOrder(tableNo) {
  try {
    let response = await axios.get(
      `https://foodmenubackend.onrender.com/orderList/${tableNo}`
    );
    if (response) {
      return response.data;
    }
  } catch (err) {
    console.log("something went wrong to fetch Menu Order");
    throw err;
  }
}

// sendMail for sending the oder to the owner kitchen.
export async function sendMail(tableNumber, userEmail) {
  try {
    let response = await axios.get(
      `https://foodmenubackend.onrender.com/sendMail/${tableNumber}/${userEmail}`
    );
    return response.data;
  } catch (err) {
    console.log("something went wrong to sendMail");
  }
}

// allOderData is for fetching all the oder data in oders collection.

export async function allOderData() {
  try {
    let response = await axios.get(
      "https://foodmenubackend.onrender.com/getAllOderData"
    );
    return response.data;
  } catch (err) {
    console.log("something went wrong to fetch allOderData", err);
  }
}

// post roti and water bottle

export async function postRotiBottleData(tableNo, roti, waterBottle) {
  try {
    let response = await axios.post(
      `https://foodmenubackend.onrender.com/rotiBevarage/postRotiOrder/${tableNo}/${roti}/${waterBottle}`
    );
    return response.data;
  } catch (error) {
    console.log(error, "roti and water bottle data is not posted");
  }
};
