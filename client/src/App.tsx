import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import RootLayout from "./layouts/RootLayout";
import AllRooms from "./pages/AllRooms";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <>
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
