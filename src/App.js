import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";

import HomePage from "./pages/HomePage";

import HopDongPage from "./pages/HopDongPage";

import HoaDonPage from "./pages/HoaDonPage";

function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}

      <Menu />

      {/* ROUTES */}

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/hop-dong" element={<HopDongPage />} />

        <Route path="/hoa-don" element={<HoaDonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
