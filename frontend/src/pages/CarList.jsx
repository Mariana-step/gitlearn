import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [modelFilter, setModelFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/cars/")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.cars)) {
          setCars(data.cars);
          setFilteredCars(data.cars);
        } else {
          console.error("Expected data format not received.");
        }
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  useEffect(() => {
    let result = cars;

    if (modelFilter) {
      result = result.filter(car =>
        car.model.toLowerCase().includes(modelFilter.toLowerCase())
      );
    }

    if (minPrice) {
      result = result.filter(car => car.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      result = result.filter(car => car.price <= parseFloat(maxPrice));
    }

    setFilteredCars(result);
  }, [modelFilter, minPrice, maxPrice, cars]);

  return (
    <div className="container mx-auto p-4">
      {/* Заголовок и кнопки */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Все автомобили</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg px-6 py-2 rounded-full shadow-md hover:scale-105 transform"
          >
            Домой
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white text-lg px-6 py-2 rounded-full shadow-md hover:scale-105 transform"
          >
            Назад
          </button>
        </div>
      </div>

      {/* Фильтры */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Поиск по модели"
          value={modelFilter}
          onChange={(e) => setModelFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
        />
        <input
          type="number"
          placeholder="Мин. цена"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        />
        <input
          type="number"
          placeholder="Макс. цена"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        />
      </div>

      {/* Список авто */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md p-4">
              {car.image1 ? (
                <img
                  src={`http://127.0.0.1:8000/${car.image1}`}
                  alt={car.model}
                  className="w-full h-56 object-cover mb-4 rounded"
                />
              ) : (
                <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-600 rounded">
                  Нет изображения
                </div>
              )}
              <h3 className="text-lg font-semibold">{car.model}</h3>
              <p className="text-gray-600">Цена: {car.price} ₽</p>
              <Link
                to={`/cars/${car.id}`}
                className="mt-2 text-blue-500 hover:underline inline-block"
              >
                Подробнее
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">Автомобили не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default CarsList;
