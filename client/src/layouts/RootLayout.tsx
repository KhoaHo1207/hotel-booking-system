import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import HotelReg from "../components/HotelReg";

export default function RootLayout() {
  return (
    <>
      <HotelReg />
      <div className="min-h-[calc(100vh-10rem)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
