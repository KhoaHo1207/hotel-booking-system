import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/HotelOwner/Navbar";
import Sidebar from "../components/HotelOwner/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";

export default function OwnerLayout() {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user || user.role !== "hotelOwner") {
    toast.error("You are not authorized to access this page");
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
