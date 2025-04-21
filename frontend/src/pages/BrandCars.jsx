import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BrandCars = () => {
  const { brand_name } = useParams();
  const [brandCars, setBrandCars] = useState([]); // машины по бренду
  const [detailedCars, setDetailedCars] = useState([]); // подробности по каждому id

  useEffect(() => {
    // Получаем список машин по бренду
    fetch(`http://127.0.0.1:8000/brands/${brand_name}/cars`)
      .then((response) => response.json())
      .then((data) => {
        setBrandCars(data);

        // Загружаем детали по каждому car.id
        const fetchDetails = async () => {
          const detailed = await Promise.all(
            data.map(async (car) => {
              const res = await fetch(`http://127.0.0.1:8000/cars/${car.id}`);
              const fullData = await res.json();
              return fullData;
            })
          );
          setDetailedCars(detailed);
        };

        fetchDetails();
      })
      .catch((error) => console.error("Ошибка при получении машин по бренду:", error));
  }, [brand_name]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Модели {brand_name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {detailedCars.map((car) => (
          <div
            key={car.id}
            className="border border-gray-300 p-4 rounded-lg shadow-md"
          >
            {car.image1 ? (
              <img
                src={`http://127.0.0.1:8000/${car.image1}`}
                alt={car.model}
                className="w-full h-48 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
                Нет изображения
              </div>
            )}

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
