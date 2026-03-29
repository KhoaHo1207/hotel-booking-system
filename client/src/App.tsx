import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import RootLayout from "./layouts/RootLayout";
import AllRooms from "./pages/AllRooms";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import MyBookings from "./pages/MyBookings";
import OwnerLayout from "./layouts/OwnerLayout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import ListRoom from "./pages/hotelOwner/ListRoom";
import AddRoom from "./pages/hotelOwner/AddRoom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./store/slices/userSlice";
import type { RootState, AppDispatch } from "./store/store";
import { useEffect } from "react";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");

  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
  }, [user, dispatch]);

  return (
    <>
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/my-bookings" element={<MyBookings />} />
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
