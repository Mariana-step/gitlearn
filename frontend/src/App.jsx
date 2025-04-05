import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BrandCars from "./pages/BrandCars";
import CarDetail from "./pages/CarDetails";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands/:brand_name/cars" element={<BrandCars />} />
        <Route path="/cars/:car_id" element={<CarDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
