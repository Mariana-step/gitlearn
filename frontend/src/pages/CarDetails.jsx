// src/pages/CarDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const response = await fetch(`http://localhost:8000/cars/${carId}`);
      const data = await response.json();
      setCar(data);
    };
    fetchCarDetails();
  }, [carId]);

  if (!car) return <div>Загрузка...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">
        {car.brand} {car.model}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8"].map((imageKey) => (
          <img
            key={imageKey}
            src={`http://localhost:8000/${car[imageKey]}`}
            alt={imageKey}
            className="w-full h-60 object-cover"
          />
        ))}
      </div>
      <p className="mt-4">Год: {car.year}</p>
      <p>Цена: {car.price} USD</p>
      <p>Тип топлива: {car.fuel_type}</p>
      <p>Трансмиссия: {car.transmission}</p>
      <p>Статус: {car.status}</p>
    </div>
  );
};

export default CarDetails;
