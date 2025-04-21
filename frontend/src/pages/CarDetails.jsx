import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const CarDetail = () => {
  const { car_id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Запрос на получение деталей автомобиля по ID
    fetch(`http://127.0.0.1:8000/cars/${car_id}`)
      .then((response) => response.json())
      .then((data) => {
        // Проверяем, что пришли данные с нужной структурой
        if (data && data.id) {
          setCar(data); // Устанавливаем данные в состояние
        } else {
          console.error("Invalid car data received:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching car details:", error); // Обработка ошибок
      });
  }, [car_id]);

  if (!car) {
    return <div>Загрузка...</div>; // Если данных еще нет
  }

  const images = [
    car.image1,
    car.image2,
    car.image3,
    car.image4,
    car.image5,
    car.image6,
    car.image7,
    car.image8,
  ].filter(Boolean); // Отфильтровываем пустые значения, если их нет

  return (
     
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {car.brand} {car.model}
      </h1>

      <div className="text-xl">
        <p><strong>Год выпуска:</strong> {car.year || "Не указан"}</p>
        <p><strong>Тип топлива:</strong> {car.fuel_type || "Не указан"}</p>
        <p><strong>Трансмиссия:</strong> {car.transmission || "Не указана"}</p>
        <p><strong>Цена:</strong> {car.price} ₽</p>
        <p><strong>Статус:</strong> {car.status || "Не указан"}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Рендерим изображения автомобиля */}
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={`http://127.0.0.1:8000/${image}`} // Путь до изображения
                alt={`car-image-${index}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))
        ) : (
          <p>Изображения отсутствуют</p> // Если нет изображений
        )}
      </div>

      
    </div>
  );
};

export default CarDetail;
