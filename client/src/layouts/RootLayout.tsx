import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="min-h-[70vh]">
      <Outlet />
      <Footer />
    </div>
  );
}
