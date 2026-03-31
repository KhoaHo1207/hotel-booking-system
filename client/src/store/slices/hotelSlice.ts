import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  AddRoomPayload,
  APIResponseNoData,
  APIResponseWithData,
  BookingPayload,
  Hotel,
  Room,
} from "../../types";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";

interface HotelState {
  hotels: Hotel[];
  ownerRooms: Room[];
  rooms: Room[];
  roomDetail: Room | null;
  isHotelsLoading: boolean;
  isOwnerRoomsLoading: boolean;
  isRoomAdding: boolean;
  isRoomAvailabilityToggling: boolean;
  isRoomsLoading: boolean;
  isRoomDetailLoading: boolean;
  isBookingLoading: boolean;
}

const initialState: HotelState = {
  hotels: [],
  ownerRooms: [],
  rooms: [],
  roomDetail: null,
  isHotelsLoading: false,
  isOwnerRoomsLoading: false,
  isRoomAdding: false,
  isRoomAvailabilityToggling: false,
  isRoomsLoading: false,
  isRoomDetailLoading: false,
  isBookingLoading: false,
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

export const getRooms = createAsyncThunk(
  "room/getRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<APIResponseWithData<Room[]>>(
        "/room"
      );
      toast.success(response.data.message || "Rooms fetched successfully");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data.message);

      toast.error(
        err.response?.data.message || "An error occurred while getting rooms"
      );
      return rejectWithValue(
        err.response?.data.message || "An error occurred while getting rooms"
      );
    }
  }
);

export const getRoomDetail = createAsyncThunk(
  "room/getRoomDetail",
  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<APIResponseWithData<Room>>(
        `/room/${roomId}`
      );
      toast.success(
        response.data.message || "Room detail fetched successfully"
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data.message);
      toast.error(
        err.response?.data.message ||
          "An error occurred while getting room detail"
      );
      return rejectWithValue(
        err.response?.data.message ||
          "An error occurred while getting room detail"
      );
    }
  }
);

export const createBooking = createAsyncThunk(
  "user/booking",
  async (payload: BookingPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<APIResponseNoData>(
        "booking/book",
        payload
      );
      toast.success(response.data.message || "Booking created successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      console.log(err.response?.data.message);
      toast.error(
        err.response?.data.message || "An error occurred while creating booking"
      );
      return rejectWithValue(
        err.response?.data.message || "An error occurred while creating booking"
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
      state.isOwnerRoomsLoading = true;
    });
    builder.addCase(getOwnerRooms.fulfilled, (state, action) => {
      state.isOwnerRoomsLoading = false;
      state.ownerRooms = action.payload.data || [];
    });
    builder.addCase(getOwnerRooms.rejected, (state) => {
      state.isOwnerRoomsLoading = false;
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
    builder.addCase(getRooms.pending, (state) => {
      state.isRoomsLoading = true;
    });
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.isRoomsLoading = false;
      state.rooms = action.payload.data || [];
    });
    builder.addCase(getRooms.rejected, (state) => {
      state.isRoomsLoading = false;
    });
    builder.addCase(getRoomDetail.pending, (state) => {
      state.isRoomDetailLoading = true;
    });
    builder.addCase(getRoomDetail.fulfilled, (state, action) => {
      state.isRoomDetailLoading = false;
      state.roomDetail = action.payload || null;
    });
    builder.addCase(getRoomDetail.rejected, (state) => {
      state.isRoomDetailLoading = false;
    });
    builder.addCase(createBooking.pending, (state) => {
      state.isBookingLoading = true;
    });
    builder.addCase(createBooking.fulfilled, (state) => {
      state.isBookingLoading = false;
    });
    builder.addCase(createBooking.rejected, (state) => {
      state.isBookingLoading = false;
    });
  },
});

export default hotelSlice.reducer;
