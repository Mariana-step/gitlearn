from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import crud
import models

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем папку static
if not os.path.exists("static/images"):
    os.makedirs("static/images")
app.mount("/static", StaticFiles(directory="static"), name="static")


def save_image(file: UploadFile):
    path = f"static/images/{file.filename}"
    with open(path, "wb") as buffer:
        buffer.write(file.file.read())
    return path

@app.post("/cars/")
async def create_car(
    brand: str = Form(...),
    model: str = Form(...),
    body_type: str = Form(...),
    year: int = Form(...),
    fuel_type: str = Form(...),
    transmission: str = Form(...),
    price: float = Form(...),
    status: str = Form(...),
    image1: UploadFile = File(...),
    image2: UploadFile = File(...),
    image3: UploadFile = File(...),
    image4: UploadFile = File(...),
    image5: UploadFile = File(...),
    image6: UploadFile = File(...),
    image7: UploadFile = File(...),
    image8: UploadFile = File(...),
):
    # Сохраняем изображения
    image_paths = [save_image(img) for img in [image1, image2, image3, image4, image5, image6, image7, image8]]

    # Создаем запись в БД
    car = models.Car(
        brand=brand,
        model=model,
        body_type=body_type,
        year=year,
        fuel_type=fuel_type,
        transmission=transmission,
        price=price,
        status=status,
        image1=image_paths[0],
        image2=image_paths[1],
        image3=image_paths[2],
        image4=image_paths[3],
        image5=image_paths[4],
        image6=image_paths[5],
        image7=image_paths[6],
        image8=image_paths[7],
    )

    car_id = crud.create_car(car)
    if car_id == -1:
        return {"message": "Error creating car."}
    return {"message": "Car created successfully!"}


@app.get("/cars/")
def get_all_cars():
    """Получение списка всех машин."""
    cars = crud.get_all_cars()
    return {"cars": [dict(car) for car in cars]}


@app.get("/cars/{car_id}")
def get_car(car_id: int):
    """Получение информации о конкретной машине."""
    car = crud.get_car_by_id(car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Машина не найдена")
    return dict(car)


@app.put("/cars/{car_id}")
def update_car(car_id: int, car: models.Car):
    """Обновление информации о машине."""
    crud.update_car(car_id, car)
    return {"message": "Машина успешно обновлена!"}


@app.delete("/cars/{car_id}")
def delete_car(car_id: int):
    """Удаление машины (только если статус Completed)."""
    car = crud.get_car_by_id(car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Машина не найдена")

    if car["status"] != "Completed":
        raise HTTPException(status_code=403, detail="Удаление доступно только для машин со статусом 'Completed'")

    crud.delete_car(car_id)
    return {"message": "Машина успешно удалена!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
