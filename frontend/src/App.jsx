import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BrandCars from "./pages/BrandCars";
import CarDetail from "./pages/CarDetails";
import CarsList from "./pages/CarList";
import Navbar from "./components/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/brands/:brand_name/cars" element={<BrandCars />} />
        <Route path="/cars/:car_id" element={<CarDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
