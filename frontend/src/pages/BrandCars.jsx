import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BrandCars = () => {
  const { brand_name } = useParams();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Получаем автомобили по бренду с бэкенда
    fetch(`http://127.0.0.1:8000/brands/${brand_name}/cars`)
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, [brand_name]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Модели {brand_name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border border-gray-300 p-4 rounded-lg shadow-md"
          >
            <img
              src={`http://127.0.0.1:8000/static/${car.image1}`}
              alt={car.model}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{car.model}</h2>
            <p className="text-gray-500">{car.year}</p>
            <p className="text-xl font-semibold mt-2">{car.price} ₽</p>
            <Link
              to={`/cars/${car.id}`}
              className="block mt-4 text-center text-blue-600"
            >
              Подробнее
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCars;
