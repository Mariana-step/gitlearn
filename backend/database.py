import sqlite3

DATABASE_FILE = "cars.db"

def get_connection():
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row 
    return conn

def initialize_database():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT NOT NULL,
        model TEXT NOT NULL,
        body_type TEXT NOT NULL,
        year INTEGER NOT NULL,
        fuel_type TEXT NOT NULL,
        transmission TEXT NOT NULL,
        price REAL NOT NULL,
        status TEXT NOT NULL,
        image1 TEXT,
        image2 TEXT,
        image3 TEXT,
        image4 TEXT,
        image5 TEXT,
        image6 TEXT,
        image7 TEXT,
        image8 TEXT
    );
    """)
    conn.commit()
    conn.close()

initialize_database()
