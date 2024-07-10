import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAllData, menuOrder, nonVegFood, orderMenuData, removeOrder,vegFood } from "../foodMenu/FoodMenuApi";

// for getting vegFood Data on UI
export const fetchVegFood = createAsyncThunk(
  "vegFood/fetchVegFood",
  async () => {
    let response = await vegFood();
    return response
  }
);

// postOrderData for posting the orders on oders mongodb database.
export const postOrderData = createAsyncThunk(
  "vegFood/postOrderData",
  async ({ no, items, tableNo }) => {
    const response = await orderMenuData({ no, items, tableNo });
    return response;
  }
);

//  removeOrderData for deleting the specific table number food
export const removeOrderData = createAsyncThunk(
  "vegFood/removeOrderData",
  async ({ tableNo, food }) => {
    const response = await removeOrder(tableNo, food);
    return response;
  }
);

// deleteAllDataFromOder for deleting all the data of selected table number in databases oders collections
export const deleteAllDataFroMOder = createAsyncThunk(
  "vegFood/deleteAllData",
  async(tableNo)=>{
    const response = await deleteAllData(tableNo)
    return response;
  }
)

// menuOrder for showing the data to selecting table number vice on UI.
export const menuOderThunk = createAsyncThunk(
  "vegFood/menuOrder",
  async (tableNo) => {
    let response = await menuOrder(tableNo);
    return response;
  }
);

// for getting NonVegFood Data on UI
export const fetchNonVegFood = createAsyncThunk(
  "vegFood/nonVegFood",
  async ()=>{
   let response = await nonVegFood()
   return response
  }
)

const vegFoodSlice = createSlice({
  name: "vegFood",
  initialState: {
    items: [],
    postOrder: [],
    menuOder:[],
    nonVegItems:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVegFood.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(postOrderData.fulfilled, (state, action) => {
        state.postOrder = action.payload;
      })
      .addCase(removeOrderData.fulfilled, (state, action) => {
        state.postOrder = action.payload;
      })
      .addCase(deleteAllDataFroMOder.fulfilled, (state, action) => {
        state.postOrder = [];
      })
      .addCase(menuOderThunk.fulfilled, (state, action) => {
        state.menuOder = action.payload;
      })
      .addCase(fetchNonVegFood.fulfilled, (state, action) => {
        state.nonVegItems = action.payload;
      });
  },
});

export default vegFoodSlice.reducer;
