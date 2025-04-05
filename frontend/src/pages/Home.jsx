import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]); // Состояние для автомобилей

  // Загрузка списка брендов
  useEffect(() => {
    fetch("http://127.0.0.1:8000/brands")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  // Загрузка списка автомобилей
  useEffect(() => {
    fetch("http://127.0.0.1:8000/cars")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched cars:", data); // Проверяем, что мы получаем
        setCars(data); // Устанавливаем данные в состояние cars
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Автомобили по брендам</h1>

      <div className="overflow-x-scroll flex space-x-6 mb-8">
        {/* Список брендов с горизонтальной прокруткой */}
        {brands.map((brand) => (
          <Link
            to={`/brands/${brand.name}/cars`}
            key={brand.name}
            className="flex flex-col items-center w-56 h-56 rounded-xl shadow-lg p-4"
          >
            <div className="w-[200px] h-[200px]">
              <img
                src={`http://127.0.0.1:8000/static/logos/${brand.name.toLowerCase()}.png`} // Логотип бренда
                alt={brand.name}
                className="w-full h-full object-contain mb-4"
              />
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Автомобили</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md p-4">
              {/* Первая картинка автомобиля */}
              <img
                src={`http://127.0.0.1:8000/static/images/${car.image1}`} // Первая картинка автомобиля
                alt={car.model}
                className="w-full h-56 object-cover mb-4"
              />
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

export default Home;
