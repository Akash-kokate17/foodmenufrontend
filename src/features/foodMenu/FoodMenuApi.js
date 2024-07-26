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
      `https://foodmenubackend.onrender.com/removeOrder/${tableNo}/${food}`
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

// this function is for posting the roti and bottle data in /postRotiBottle rest api in backend ;
export async function postRotiBottleDataInBody(postData) {
  try {
    let response = await axios.post(
      "https://foodmenubackend.onrender.com/postRotiBottle",
      postData
    );
    return response.data;
  } catch (error) {
    console.log("something went wrong to send roti and bottle data", error);
  }
}

// this api /getRotiBottleTableNo is for getting all the data inside "rotibottlecounts" database.

export async function getAllRotiBottleTableNo() {
  try {
    let response = await axios.get(
      "https://foodmenubackend.onrender.com/getRotiBottleTableNo"
    );
    return response.data;
  } catch (error) {
    console.log("something went wrong to getting roti and bottle count");
  }
}

// this function is for send otp through the mail
export async function sendOtpMail(otp, gmail) {
  try {
    await axios.get(
      `https://foodmenubackend.onrender.com/otpVerificationMail/${otp}/${gmail}`
    );
  } catch (error) {
    console.log("something went wrong to send otp mail");
  }
}

// this function is for delete the roti and bottle of specific table number

export async function deleteRotiAndBottle(tableNo) {
  try {
    let response = await axios.delete(
      `https://foodmenubackend.onrender.com/deleteAllRotiBottle/${tableNo}`
    );
    return response.data;
  } catch (error) {
    console.log("something went wrong to delete roti and bottle table");
  }
}
