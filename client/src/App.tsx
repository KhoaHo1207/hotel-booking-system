import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <>
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
