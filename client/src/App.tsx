import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import OwnerLayout from "./layouts/OwnerLayout";
import RootLayout from "./layouts/RootLayout";
import AllRooms from "./pages/AllRooms";
import Home from "./pages/Home";
import AddRoom from "./pages/hotelOwner/AddRoom";
import Dashboard from "./pages/hotelOwner/Dashboard";
import ListRoom from "./pages/hotelOwner/ListRoom";
import LoginPage from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import RegisterPage from "./pages/Register";
import RoomDetail from "./pages/RoomDetail";
import ProfilePage from "./pages/Profile";
import { getProfile } from "./store/slices/userSlice";
import type { AppDispatch, RootState } from "./store/store";

function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
  }, [user, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="list-room" element={<ListRoom />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
