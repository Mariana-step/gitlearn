// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BrandPage from "./pages/BrandPage";
import CarDetails from "./pages/CarDetails";

const App = () => (
  <Router>
    <Routes>
      <Route path="/brands" element={<Home />} />
      <Route path="/brand/:brandName" element={<BrandPage />} />
      <Route path="/car/:carId" element={<CarDetails />} />
    </Routes>
  </Router>
);

export default App;
