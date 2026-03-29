import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  AddRoomPayload,
  APIResponseNoData,
  APIResponseWithData,
  Hotel,
  Room,
} from "../../types";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";

interface HotelState {
  hotels: Hotel[];
  isHotelsLoading: boolean;
  rooms: Room[];
  isRoomsLoading: boolean;
  isRoomAdding: boolean;
  isRoomAvailabilityToggling: boolean;
}

const initialState: HotelState = {
  hotels: [],
  isHotelsLoading: false,
  rooms: [],
  isRoomsLoading: false,
  isRoomAdding: false,
  isRoomAvailabilityToggling: false,
};

export const addRoom = createAsyncThunk(
  "hotel/addRoom",
  async (payload: AddRoomPayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("roomType", payload.roomType);
      formData.append("pricePerNight", payload.pricePerNight.toString());
      payload.amenities.forEach((amenity) =>
        formData.append("amenities[]", amenity)
      );
      payload.images.forEach((image) => formData.append("images", image));

      const response = await axiosInstance.post<APIResponseNoData>(
        "/room",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message || "Room added successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data.message);
      toast.error(
        err.response?.data.message || "An error occurred while adding room"
      );
      return rejectWithValue(
        err.response?.data.message || "An error occurred while adding room"
      );
    }
  }
);

export const getOwnerRooms = createAsyncThunk(
  "hotel/getOwnerRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<APIResponseWithData<Room[]>>(
        "/room/owner"
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      console.log(err.response?.data.message);
      toast.error(
        err.response?.data.message ||
          "An error occurred while getting owner rooms"
      );
      return rejectWithValue(
        err.response?.data.message ||
          "An error occurred while getting owner rooms"
      );
    }
  }
);

export const toggleRoomAvailability = createAsyncThunk(
  "hotel/toggleRoomAvailability",
  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch<APIResponseNoData>(
        `/room/${roomId}/toggle-availability`
      );
      toast.success(
        response.data.message || "Room availability toggled successfully"
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data.message);
      toast.error(
        err.response?.data.message ||
          "An error occurred while toggling room availability"
      );
      return rejectWithValue(
        err.response?.data.message ||
          "An error occurred while toggling room availability"
      );
    }
  }
);
const hotelSlice = createSlice({
  name: "hotel",
  initialState,

  reducers: {},

  extraReducers(builder) {
    builder.addCase(addRoom.pending, (state) => {
      state.isRoomAdding = true;
    });
    builder.addCase(addRoom.fulfilled, (state) => {
      state.isRoomAdding = false;
    });
    builder.addCase(addRoom.rejected, (state) => {
      state.isRoomAdding = false;
    });
    builder.addCase(getOwnerRooms.pending, (state) => {
      state.isRoomsLoading = true;
    });
    builder.addCase(getOwnerRooms.fulfilled, (state, action) => {
      state.isRoomsLoading = false;
      state.rooms = action.payload.data || [];
    });
    builder.addCase(getOwnerRooms.rejected, (state) => {
      state.isRoomsLoading = false;
    });
    builder.addCase(toggleRoomAvailability.pending, (state) => {
      state.isRoomAvailabilityToggling = true;
    });
    builder.addCase(toggleRoomAvailability.fulfilled, (state) => {
      state.isRoomAvailabilityToggling = false;
    });
    builder.addCase(toggleRoomAvailability.rejected, (state) => {
      state.isRoomAvailabilityToggling = false;
    });
  },
});

export default hotelSlice.reducer;
