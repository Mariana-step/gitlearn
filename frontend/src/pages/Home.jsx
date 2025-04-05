// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await fetch("http://localhost:8000/brands");
      const data = await response.json();
      setBrands(data);
    };
    fetchBrands();

    const fetchCars = async () => {
      const response = await fetch("http://localhost:8000/cars");
      const data = await response.json();
      setCars(data);
    };
    fetchCars();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Все бренды</h1>
      <div className="flex overflow-x-auto space-x-4 mb-6">
        {brands.map((brand) => (
          <Link key={brand.name} to={`/brand/${brand.name}`} className="p-4">
            <img
              src={`http://localhost:8000/${brand.logo}`}
              alt={brand.name}
              className="w-24 h-24 object-contain"
            />
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Все автомобили</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="border p-4 rounded-lg">
            <img
              src={`http://localhost:8000/${car.image1}`}
              alt={car.model}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{car.model}</h3>
            <p className="text-gray-600">{car.price} USD</p>
            <Link
              to={`/car/${car.id}`}
              className="text-blue-500 mt-2 inline-block"
            >
              Подробнее
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
