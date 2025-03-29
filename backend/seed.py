from database import get_connection

def seed_data():
    cars = [
        ("Toyota", "Corolla", "Sedan", 2020, "Petrol", "Automatic", 20000.0, "In Progress", "static/images/toyota_front.jpg", "static/images/toyota_back.jpg", "static/images/toyota_interior.jpg", "static/images/toyota_side1.jpg", "static/images/toyota_side2.jpg", "static/images/toyota_engine.jpg", "static/images/toyota_wheels.jpg", "static/images/toyota_rear.jpg"),
        ("Honda", "Civic", "Sedan", 2019, "Petrol", "Manual", 18000.0, "Completed", "static/images/honda_front.jpg", "static/images/honda_back.jpg", "static/images/honda_interior.jpg", "static/images/honda_side1.jpg", "static/images/honda_side2.jpg", "static/images/honda_engine.jpg", "static/images/honda_wheels.jpg", "static/images/honda_rear.jpg"),
        ("Ford", "Mustang", "Coupe", 2021, "Petrol", "Automatic", 35000.0, "Work in Progress", "static/images/ford_front.jpg", "static/images/ford_back.jpg", "static/images/ford_interior.jpg", "static/images/ford_side1.jpg", "static/images/ford_side2.jpg", "static/images/ford_engine.jpg", "static/images/ford_wheels.jpg", "static/images/ford_rear.jpg"),
        ("BMW", "X5", "SUV", 2020, "Diesel", "Automatic", 45000.0, "Completed", "static/images/bmw_front.jpg", "static/images/bmw_back.jpg", "static/images/bmw_interior.jpg", "static/images/bmw_side1.jpg", "static/images/bmw_side2.jpg", "static/images/bmw_engine.jpg", "static/images/bmw_wheels.jpg", "static/images/bmw_rear.jpg"),
        ("Audi", "A4", "Sedan", 2022, "Petrol", "Manual", 30000.0, "In Progress", "static/images/audi_front.jpg", "static/images/audi_back.jpg", "static/images/audi_interior.jpg", "static/images/audi_side1.jpg", "static/images/audi_side2.jpg", "static/images/audi_engine.jpg", "static/images/audi_wheels.jpg", "static/images/audi_rear.jpg"),
        ("Mercedes", "E-Class", "Sedan", 2019, "Diesel", "Automatic", 42000.0, "Work in Progress", "static/images/mercedes_front.jpg", "static/images/mercedes_back.jpg", "static/images/mercedes_interior.jpg", "static/images/mercedes_side1.jpg", "static/images/mercedes_side2.jpg", "static/images/mercedes_engine.jpg", "static/images/mercedes_wheels.jpg", "static/images/mercedes_rear.jpg"),
        ("Chevrolet", "Camaro", "Coupe", 2021, "Petrol", "Automatic", 37000.0, "Completed", "static/images/chevrolet_front.jpg", "static/images/chevrolet_back.jpg", "static/images/chevrolet_interior.jpg", "static/images/chevrolet_side1.jpg", "static/images/chevrolet_side2.jpg", "static/images/chevrolet_engine.jpg", "static/images/chevrolet_wheels.jpg", "static/images/chevrolet_rear.jpg"),
        ("Nissan", "370Z", "Coupe", 2020, "Petrol", "Manual", 32000.0, "In Progress", "static/images/nissan_front.jpg", "static/images/nissan_back.jpg", "static/images/nissan_interior.jpg", "static/images/nissan_side1.jpg", "static/images/nissan_side2.jpg", "static/images/nissan_engine.jpg", "static/images/nissan_wheels.jpg", "static/images/nissan_rear.jpg"),
        ("Lexus", "RX 350", "SUV", 2022, "Hybrid", "Automatic", 55000.0, "Completed", "static/images/lexus_front.jpg", "static/images/lexus_back.jpg", "static/images/lexus_interior.jpg", "static/images/lexus_side1.jpg", "static/images/lexus_side2.jpg", "static/images/lexus_engine.jpg", "static/images/lexus_wheels.jpg", "static/images/lexus_rear.jpg"),
        ("Porsche", "911", "Coupe", 2021, "Petrol", "Manual", 90000.0, "Work in Progress", "static/images/porsche_front.jpg", "static/images/porsche_back.jpg", "static/images/porsche_interior.jpg", "static/images/porsche_side1.jpg", "static/images/porsche_side2.jpg", "static/images/porsche_engine.jpg", "static/images/porsche_wheels.jpg", "static/images/porsche_rear.jpg"),
        ("Jaguar", "F-Type", "Coupe", 2022, "Petrol", "Automatic", 75000.0, "In Progress", "static/images/jaguar_front.jpg", "static/images/jaguar_back.jpg", "static/images/jaguar_interior.jpg", "static/images/jaguar_side1.jpg", "static/images/jaguar_side2.jpg", "static/images/jaguar_engine.jpg", "static/images/jaguar_wheels.jpg", "static/images/jaguar_rear.jpg")
    
    ]

    conn = get_connection()
    cursor = conn.cursor()
    
    # Вставляем данные
    cursor.executemany("""
    INSERT INTO cars (brand, model, body_type, year, fuel_type, transmission, price, status, 
                      image1, image2, image3, image4, image5, image6, image7, image8)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, cars)
    
    conn.commit()
    conn.close()
    print("База данных успешно заполнена")

if __name__ == "__main__":
    seed_data()
