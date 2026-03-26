import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <>
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
