import type { AxiosError } from "axios";
import type { APIResponse, LoginPayload, User } from "../../types/index";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosConfig";
import toast from "react-hot-toast";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  isUserLoading: boolean;
  userError: string | null;
  authError: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
  isUserLoading: false,
  userError: null,
  authError: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/sign-in", payload);
      toast.success("Logged in successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      console.log(err.response?.data.message);

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
      const response = await axiosInstance.get<APIResponse<User>>(
        "/user/profile"
      );
      toast.success(response.data.message || "Profile fetched successfully");
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
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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
  },
});

export default userSlice.reducer;
