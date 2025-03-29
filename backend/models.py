from pydantic import BaseModel
from typing import Optional

class CarBase(BaseModel):
    brand: str
    model: str
    body_type: str
    year: int
    fuel_type: str
    transmission: str
    price: float
    status: str
    image1: str
    image2: str
    image3: str
    image4: str
    image5: str
    image6: str
    image7: str
    image8: str

class CarCreate(CarBase):
    pass

class Car(CarBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True