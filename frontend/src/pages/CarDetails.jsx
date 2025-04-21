import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CarDetail = () => {
  const { car_id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/cars/${car_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.id) {
          setCar(data);
        } else {
          console.error("Invalid car data received:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });
  }, [car_id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот автомобиль?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/cars/${car_id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Автомобиль удалён");
          navigate("/cars");
        } else {
          alert("Не удалось удалить автомобиль");
        }
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    }
  };

  if (!car) {
    return <div>Загрузка...</div>;
  }

  const images = [
    car.image1, car.image2, car.image3, car.image4,
    car.image5, car.image6, car.image7, car.image8,
  ].filter(Boolean);

  const getStatusColor = (status) => {
    switch (status) {
      case "Завершено":
        return "bg-green-600";
      case "В работе":
        return "bg-orange-500";
      case "Принят в работу":
        return "bg-gray-600";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Заголовок + кнопки */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">
          {car.brand} {car.model}
        </h1>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => navigate("/cars")}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition"
          >
            Все авто
          </button>
          <button
            onClick={() => navigate(`/cars/${car.id}/edit`)}
            className="bg-gradient-to-r from-orange-500 to-orange-700 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition"
          >
            Обновить
          </button>
          <button
            onClick={handleDelete}
            className="bg-gradient-to-r from-red-700 to-red-900 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition"
          >
            Удалить
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition"
          >
            Назад
          </button>
        </div>
      </div>

      {/* Характеристики */}
      <div className="text-xl mb-6 space-y-2">
        <p><strong>Год выпуска:</strong> {car.year || "Не указан"}</p>
        <p><strong>Тип топлива:</strong> {car.fuel_type || "Не указан"}</p>
        <p><strong>Трансмиссия:</strong> {car.transmission || "Не указана"}</p>
        <p><strong>Цена:</strong> {car.price} ₽</p>
        
        {/* Статус с цветом */}
        <div className="flex items-center gap-2">
          <strong>Статус:</strong>
          <span className={`text-white px-4 py-1 rounded-full font-semibold ${getStatusColor(car.status)}`}>
            {car.status || "Не указан"}
          </span>
        </div>
      </div>

      {/* Картинки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={`http://127.0.0.1:8000/${image}`}
                alt={`car-image-${index}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))
        ) : (
          <p>Изображения отсутствуют</p>
        )}
      </div>
    </div>
  );
};

export default CarDetail;
