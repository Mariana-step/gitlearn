import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const BrandCars = () => {
  const { brand_name } = useParams();
  const navigate = useNavigate();
  const [brandCars, setBrandCars] = useState([]);
  const [detailedCars, setDetailedCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/brands/${brand_name}/cars`)
      .then((response) => response.json())
      .then((data) => {
        setBrandCars(data);
        const fetchDetails = async () => {
          const detailed = await Promise.all(
            data.map(async (car) => {
              const res = await fetch(`http://127.0.0.1:8000/cars/${car.id}`);
              const fullData = await res.json();
              return fullData;
            })
          );
          setDetailedCars(detailed);
          setFilteredCars(detailed); // инициализация фильтрованного списка
        };
        fetchDetails();
      })
      .catch((error) => console.error("Ошибка при получении машин по бренду:", error));
  }, [brand_name]);

  useEffect(() => {
    let filtered = detailedCars;

    if (minPrice) {
      filtered = filtered.filter(car => car.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(car => car.price <= parseFloat(maxPrice));
    }

    setFilteredCars(filtered);
  }, [minPrice, maxPrice, detailedCars]);

  return (
    <div className="container mx-auto p-4">
      {/* Заголовок и кнопки */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Модели {brand_name}</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
          >
            Домой
          </button>
          <button
            onClick={() => navigate("/cars")}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
          >
            Все авто
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
          >
            Назад
          </button>
        </div>
      </div>

      {/* Фильтры */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="number"
          placeholder="Мин. цена"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3"
        />
        <input
          type="number"
          placeholder="Макс. цена"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3"
        />
      </div>

      {/* Список авто */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
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
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600 rounded-md">
                  Нет изображения
                </div>
              )}

              <h2 className="text-xl font-semibold mt-2">{car.model}</h2>
              <p className="text-gray-500">{car.year}</p>
              <p className="text-xl font-semibold mt-2">{car.price} ₽</p>
              <Link
                to={`/cars/${car.id}`}
                className="block mt-4 text-center text-blue-600 hover:underline"
              >
                Подробнее
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">Машины не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default BrandCars;
