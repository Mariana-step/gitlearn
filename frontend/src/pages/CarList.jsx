import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const CarsList = () => {
  const [cars, setCars] = useState([]); // Состояние для хранения автомобилей

  useEffect(() => {
    // Запрос на получение всех автомобилей
    fetch("http://127.0.0.1:8000/cars/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched cars:", data); // Для проверки данных
        // Проверяем, что получаем массив автомобилей
        if (data && Array.isArray(data.cars)) {
          setCars(data.cars); // Если данные корректны, сохраняем их в состояние
        } else {
          console.error("Expected data format not received.");
        }
      })
      .catch((error) => {
        console.error("Error fetching cars:", error); // Обработка ошибок
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Все автомобили</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md p-4">
              {/* Проверяем наличие первой картинки */}
              {car.image1 ? (
                <img
                  src={`http://127.0.0.1:8000/${car.image1}`} // Путь до первой картинки
                  alt={car.model}
                  className="w-full h-56 object-cover mb-4"
                />
              ) : (
                <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-600">
                  Нет изображения
                </div>
              )}

              <h3 className="text-lg font-semibold">{car.model}</h3>
              <p className="text-gray-600">Цена: ${car.price}</p>
              <Link
                to={`/cars/${car.id}`}
                className="mt-2 text-blue-500 hover:underline"
              >
                Подробнее
              </Link>
            </div>
          ))
        ) : (
          <p>Автомобили не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default CarsList;
