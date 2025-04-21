import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Navbar from "../components/Navbar";

const Home = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/cars")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.cars)) {
          setCars(data.cars);
        } else {
          console.error("Data structure is not as expected.");
        }
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-10">
        <Slider {...sliderSettings}>
          {cars.map((car) =>
            car.image1 ? (
              <div key={car.id}>
                <img
                  src={`http://127.0.0.1:8000/${car.image1}`}
                  alt={car.model}
                  className="w-full h-[800px] object-cover rounded-2xl shadow-xl"
                />
              </div>
            ) : null
          )}
        </Slider>
      </div>

      <div className="flex justify-center gap-8 mb-8">
        <button
          onClick={() => navigate("/cars")}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition"
        >
          Все авто
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 transform "
        >
          Назад
        </button>
      </div>
    </div>
  );
};

export default Home;
