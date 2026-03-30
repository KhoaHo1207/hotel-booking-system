import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HotelReg from "../components/HotelReg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { getRooms } from "../store/slices/hotelSlice";

export default function RootLayout() {
  const { showHotelReg } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-10rem)]">
        <Outlet />
      </div>
      {showHotelReg && <HotelReg />}
      <Footer />
    </>
  );
}
