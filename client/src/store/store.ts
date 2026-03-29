import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.ts";
import hotelReducer from "./slices/hotelSlice.ts";

const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
