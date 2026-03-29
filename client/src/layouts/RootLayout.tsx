import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HotelReg from "../components/HotelReg";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function RootLayout() {
  const { showHotelReg } = useSelector((state: RootState) => state.user);
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
