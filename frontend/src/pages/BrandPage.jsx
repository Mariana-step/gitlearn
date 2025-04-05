// src/pages/BrandPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BrandPage = () => {
  const { brandName } = useParams(); // Получаем название бренда
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCarsByBrand = async () => {
      const response = await fetch(`http://localhost:8000/brands/${brandName}/cars`);
      const data = await response.json();
      setCars(data);
    };
    fetchCarsByBrand();
  }, [brandName]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Автомобили бренда: {brandName}</h1>
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

export default BrandPage;
