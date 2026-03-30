import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { APIResponseWithData, Booking } from "../../types";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";

interface DashboardState {
  dashboardData: {
    bookings: Booking[];
    totalBookings: number;
    totalRevenue: number;
  };
  isDashboardLoading: boolean;
}

const initialState: DashboardState = {
  dashboardData: {
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  },
  isDashboardLoading: false,
};

export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<APIResponseWithData<Booking[]>>(
        "/booking/hotel"
      );
      toast.success(
        response.data.message || "Dashboard data fetched successfully"
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message ||
          "An error occurred while getting dashboard data"
      );
      console.log(err.response?.data.message);
      return rejectWithValue(
        err.response?.data.message ||
          "An error occurred while getting dashboard data"
      );
    }
  }
);
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  reducers: {},

  extraReducers(builder) {
    builder.addCase(getDashboardData.pending, (state) => {
      state.isDashboardLoading = true;
    });
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.isDashboardLoading = false;
      state.dashboardData.bookings = action.payload.data || [];
      state.dashboardData.totalBookings =
        action.payload.meta?.pagination?.total || 0;
      state.dashboardData.totalRevenue =
        action.payload.meta?.stats?.totalRevenue || 0;
    });
    builder.addCase(getDashboardData.rejected, (state) => {
      state.isDashboardLoading = false;
    });
  },
});

export default dashboardSlice.reducer;
