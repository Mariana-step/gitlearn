import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetail = () => {
  const { car_id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Получаем детали автомобиля по ID с бэкенда
    fetch(`http://127.0.0.1:8000/cars/${car_id}`)
      .then((response) => response.json())
      .then((data) => setCar(data))
      .catch((error) => console.error("Error fetching car details:", error));
  }, [car_id]);

  if (!car) return <div>Загрузка...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {car.brand} {car.model}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Проверка на наличие массива images перед рендерингом */}
        {car.images && car.images.length > 0 ? (
          car.images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={`http://127.0.0.1:8000/static/${image}`}
                alt={`car-image-${index}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))
        ) : (
          <p>Изображения отсутствуют</p>
        )}
      </div>
      <div className="text-xl">
        <p><strong>Год выпуска:</strong> {car.year}</p>
        <p><strong>Тип топлива:</strong> {car.fuel_type}</p>
        <p><strong>Трансмиссия:</strong> {car.transmission}</p>
        <p><strong>Цена:</strong> {car.price} ₽</p>
        <p><strong>Статус:</strong> {car.status}</p>
      </div>
    </div>
  );
};

export default CarDetail;
