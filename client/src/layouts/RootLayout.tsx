import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <>
      <div className="min-h-[calc(100vh-10rem)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
