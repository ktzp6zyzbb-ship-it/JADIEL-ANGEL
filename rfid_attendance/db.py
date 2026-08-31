"""SQLite-backed storage for students and attendance records."""
import sqlite3
from datetime import datetime
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "attendance.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rfid_tag TEXT NOT NULL UNIQUE,
    student_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    registered_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_fk INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    rfid_tag TEXT NOT NULL,
    timestamp TEXT NOT NULL
);
"""


class Database:
    def __init__(self, db_path=DB_PATH):
        self.conn = sqlite3.connect(db_path)
        self.conn.execute("PRAGMA foreign_keys = ON")
        self.conn.row_factory = sqlite3.Row
        self.conn.executescript(SCHEMA)
        self.conn.commit()

    def add_student(self, rfid_tag, student_id, name):
        self.conn.execute(
            "INSERT INTO students (rfid_tag, student_id, name, registered_at) "
            "VALUES (?, ?, ?, ?)",
            (rfid_tag, student_id, name, datetime.now().isoformat(timespec="seconds")),
        )
        self.conn.commit()

    def find_student_by_tag(self, rfid_tag):
        cur = self.conn.execute("SELECT * FROM students WHERE rfid_tag = ?", (rfid_tag,))
        return cur.fetchone()

    def student_id_exists(self, student_id):
        cur = self.conn.execute("SELECT 1 FROM students WHERE student_id = ?", (student_id,))
        return cur.fetchone() is not None

    def list_students(self):
        cur = self.conn.execute("SELECT * FROM students ORDER BY name")
        return cur.fetchall()

    def record_attendance(self, student_row):
        self.conn.execute(
            "INSERT INTO attendance (student_fk, rfid_tag, timestamp) VALUES (?, ?, ?)",
            (student_row["id"], student_row["rfid_tag"], datetime.now().isoformat(timespec="seconds")),
        )
        self.conn.commit()

    def already_marked_on(self, student_fk, date_str):
        cur = self.conn.execute(
            "SELECT 1 FROM attendance WHERE student_fk = ? AND substr(timestamp, 1, 10) = ?",
            (student_fk, date_str),
        )
        return cur.fetchone() is not None

    def list_attendance(self, date_filter=None):
        query = (
            "SELECT a.timestamp, s.student_id, s.name, a.rfid_tag "
            "FROM attendance a JOIN students s ON s.id = a.student_fk "
        )
        params = ()
        if date_filter:
            query += "WHERE substr(a.timestamp, 1, 10) = ? "
            params = (date_filter,)
        query += "ORDER BY a.timestamp"
        return self.conn.execute(query, params).fetchall()

    def reset(self):
        self.conn.executescript("DELETE FROM attendance; DELETE FROM students;")
        self.conn.commit()

    def close(self):
        self.conn.close()
