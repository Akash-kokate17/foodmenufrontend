// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import vegFoodReducer from '../features/foodMenu/FoodMenuSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    vegFood: vegFoodReducer,
  },
});

export default store;

