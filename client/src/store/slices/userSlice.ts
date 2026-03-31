import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";
import type {
  APIResponseNoData,
  APIResponseWithData,
  HotelRegistrationPayload,
  LoginPayload,
  RegisterPayload,
  Room,
  User,
} from "../../types/index";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  isUserLoading: boolean;
  userError: string | null;
  authError: string | null;
  showHotelReg: boolean;
  isHotelRegistering: boolean;
  recommendRooms: Room[] | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
  isUserLoading: false,
  userError: null,
  authError: null,
  showHotelReg: false,
  isHotelRegistering: false,
  recommendRooms: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      await axiosInstance.post<APIResponseNoData>("/auth/sign-in", payload);
      toast.success("Logged in successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      console.log(err.response?.data.message);
      toast.error(err.response?.data.message || "Login failed");
      return rejectWithValue(
        err.response?.data.message || "An error occurred while logging in"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<APIResponseWithData<User>>(
        "/user/profile"
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data.message);
      return rejectWithValue(
        err.response?.data.message || "An error occurred while getting profile"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<APIResponseNoData>(
        "/auth/sign-out"
      );
      toast.success(response.data.message || "Logged out successfullyyyy");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data.message);
      return rejectWithValue(
        err.response?.data.message || "An error occurred while logging out"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<APIResponseNoData>(
        "/auth/sign-up",
        payload
      );
      toast.success(response.data.message || "Registered successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      console.log(err.response?.data.message);
      return rejectWithValue(
        err.response?.data.message || "An error occurred while registering"
      );
    }
  }
);

export const registerHotel = createAsyncThunk(
  "hotel/register",
  async (payload: HotelRegistrationPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<APIResponseNoData>(
        "/hotel",
        payload
      );
      toast.success(response.data.message || "Hotel registered successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message ||
          "An error occurred while registering hotel"
      );
      console.log(err.response?.data.message);
      return rejectWithValue(
        err.response?.data.message ||
          "An error occurred while registering hotel"
      );
    }
  }
);

export const storeRecentSearchedCities = createAsyncThunk(
  "user/storeRecentSearchedCities",
  async (recentSearchedCity: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<APIResponseNoData>(
        "/user/store-recent-searched-cities",
        { recentSearchedCity }
      );
      toast.success(response.data.message || "City searched successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "An error occurred while searching city"
      );
      console.log(err.response?.data.message);
      return rejectWithValue(
        err.response?.data.message || "An error occurred while searching city"
      );
    }
  }
);

export const getRecommendRooms = createAsyncThunk(
  "user/getRecommendRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<APIResponseWithData<Room[]>>(
        "/user/recommend-rooms"
      );
      toast.success(
        response.data.message || "Recommend rooms fetched successfully"
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message ||
          "An error occurred while getting recommend rooms"
      );
      console.log(err.response?.data.message);

      return rejectWithValue(
        err.response?.data.message ||
          "An error occurred while getting recommend rooms"
      );
    }
  }
);

export const checkAvailability = createAsyncThunk(
  "user/checkAvailability",
  async (
    payload: {
      room: Room["_id"];
      checkInDate: string;
      checkOutDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<APIResponseWithData<boolean>>(
        "/booking/check-availability",
        payload
      );
      toast.success(
        response.data.message || response.data.data
          ? "Room is available"
          : "Room is not available"
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data.message);
      toast.error(
        err.response?.data.message ||
          "An error occurred while checking availability"
      );
      return rejectWithValue(
        err.response?.data.message ||
          "An error occurred while checking availability"
      );
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    setShowHotelReg: (state, action: PayloadAction<boolean>) => {
      state.showHotelReg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isAuthLoading = true;
      state.authError = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isAuthLoading = false;
      state.isAuthenticated = true;
      state.authError = null;
    });
    builder.addCase(login.rejected, (state) => {
      state.isAuthLoading = false;
      state.isAuthenticated = false;
      state.authError = "An error occurred while logging in";
    });
    builder.addCase(getProfile.pending, (state) => {
      state.isUserLoading = true;
      state.userError = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.userError = null;
      state.user = action.payload;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isUserLoading = false;
      state.userError = "An error occurred while getting profile";
      state.isAuthenticated = false;
      state.user = null;
      toast.error("An error occurred while getting profile");
    });
    builder.addCase(logout.pending, (state) => {
      state.isAuthLoading = true;
      state.authError = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthLoading = false;
      state.isAuthenticated = false;
      state.authError = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isAuthLoading = false;
      state.isAuthenticated = true;
      state.authError = "An error occurred while logging out";
    });
    builder.addCase(register.pending, (state) => {
      state.isAuthLoading = true;
      state.authError = null;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isAuthLoading = false;
      state.authError = null;
    });
    builder.addCase(register.rejected, (state) => {
      state.isAuthLoading = false;
      state.isAuthenticated = false;
      state.authError = "An error occurred while registering";
    });
    builder.addCase(registerHotel.pending, (state) => {
      state.isHotelRegistering = true;
    });
    builder.addCase(registerHotel.fulfilled, (state) => {
      state.isHotelRegistering = false;
    });
    builder.addCase(registerHotel.rejected, (state) => {
      state.isHotelRegistering = false;
    });
    builder.addCase(storeRecentSearchedCities.pending, (state) => {
      state.isUserLoading = true;
      state.userError = null;
    });
    builder.addCase(storeRecentSearchedCities.fulfilled, (state) => {
      state.isUserLoading = false;
      state.userError = null;
    });
    builder.addCase(storeRecentSearchedCities.rejected, (state) => {
      state.isUserLoading = false;
      state.userError =
        "An error occurred while storing recent searched cities";
    });
    builder.addCase(getRecommendRooms.pending, (state) => {
      state.isUserLoading = true;
      state.userError = null;
    });
    builder.addCase(getRecommendRooms.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.userError = null;
      state.recommendRooms = action.payload;
    });
    builder.addCase(getRecommendRooms.rejected, (state) => {
      state.isUserLoading = false;
      state.userError = "An error occurred while getting recommend rooms";
    });
    builder.addCase(checkAvailability.pending, (state) => {
      state.isUserLoading = true;
      state.userError = null;
    });
    builder.addCase(checkAvailability.fulfilled, (state) => {
      state.isUserLoading = false;
      state.userError = null;
    });
    builder.addCase(checkAvailability.rejected, (state) => {
      state.isUserLoading = false;
      state.userError = "An error occurred while checking availability";
    });
  },
});

export const { setUser, setShowHotelReg } = userSlice.actions;
export default userSlice.reducer;
