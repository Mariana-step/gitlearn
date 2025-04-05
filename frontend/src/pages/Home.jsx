import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Получаем список брендов с бэкенда
    fetch("http://127.0.0.1:8000/brands")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Автомобили по брендам</h1>

      <div className="overflow-x-scroll flex space-x-4 mb-8">
        {/* Список брендов с горизонтальной прокруткой */}
        {brands.map((brand) => (
          <Link
            to={`/brands/${brand.name}/cars`}
            key={brand.name}
            className="w-20 h-20 bg-gray-200 rounded-full flex justify-center items-center"
          >
            <img
              src={`http://127.0.0.1:8000/static/${brand.logo}`}
              alt={brand.name}
              className="w-16 h-16 object-contain"
            />
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Автомобили</h2>
      {/* Здесь будет выводиться автомобили */}
    </div>
  );
};

export default Home;
