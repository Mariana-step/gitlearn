import sqlite3
import os
from models import Car

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_FILE = os.path.join(BASE_DIR, "cars.db")


def get_connection():
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def create_car(car: Car) -> int:
    """Добавление новой машины в базу данных и возврат сгенерированного id."""
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO cars 
            (brand, model, body_type, year, fuel_type, transmission, price, status, 
            image1, image2, image3, image4, image5, image6, image7, image8) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                car.brand, car.model, car.body_type, car.year, car.fuel_type,
                car.transmission, car.price, car.status,
                car.image1, car.image2, car.image3, car.image4,
                car.image5, car.image6, car.image7, car.image8
            )
        )
        conn.commit()
        car_id = cursor.lastrowid
        if car_id == 0:
            raise Exception("Failed to retrieve the generated car ID.")
        return car_id
    except Exception as e:
        conn.rollback()  # Ensure rollback on error
        print(f"Error inserting car: {e}")  # Log the error
        return -1  # Return a default error value or handle as needed
    finally:
        conn.close()  # Закрытие соединения

def get_all_cars():
    """Получение списка всех машин."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cars")
    cars = cursor.fetchall()
    conn.close()
    return cars


def get_car_by_id(car_id: int):
    """Получение информации о машине по ID."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cars WHERE id = ?", (car_id,))
    car = cursor.fetchone()
    conn.close()
    return car


def update_car(car_id: int, car: Car):
    """Обновление информации о машине."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE cars
        SET brand = ?, model = ?, body_type = ?, year = ?, fuel_type = ?, 
            transmission = ?, price = ?, status = ?, 
            image1 = ?, image2 = ?, image3 = ?, image4 = ?, 
            image5 = ?, image6 = ?, image7 = ?, image8 = ?
        WHERE id = ?
        """,
        (
            car.brand, car.model, car.body_type, car.year, car.fuel_type,
            car.transmission, car.price, car.status,
            car.image1, car.image2, car.image3, car.image4,
            car.image5, car.image6, car.image7, car.image8, car_id
        )
    )
    conn.commit()
    conn.close()


def delete_car(car_id: int):
    """Удаление машины из базы данных, если статус позволяет."""
    conn = get_connection()
    cursor = conn.cursor()

    # Проверяем статус машины перед удалением
    cursor.execute("SELECT status FROM cars WHERE id = ?", (car_id,))
    car = cursor.fetchone()

    if car and car["status"] == "Completed":
        cursor.execute("DELETE FROM cars WHERE id = ?", (car_id,))
        conn.commit()
    else:
        print("Машину можно удалить только в статусе 'Completed'.")

    conn.close()