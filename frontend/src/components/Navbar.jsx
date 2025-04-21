// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [brands, setBrands] = useState([]);

  // Загрузка списка брендов
  useEffect(() => {
    fetch("http://127.0.0.1:8000/brands")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  return (
    <div className="bg-white shadow-md py-4 mb-6">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-2xl font-bold mb-4">Наши бренды</h1>

        <div className="overflow-x-scroll flex space-x-6 scrollbar-hide">
          {brands.map((brand) => (
            <Link
              to={`/brands/${brand.name}/cars`}
              key={brand.name}
              className="flex flex-col items-center w-56 h-56 rounded-xl shadow-lg p-4"
            >
              <div className="w-[200px] h-[200px]">
                <img
                  src={`http://127.0.0.1:8000/static/logos/${brand.name.toLowerCase()}.png`}
                  alt={brand.name}
                  className="w-full h-full object-contain mb-4"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
