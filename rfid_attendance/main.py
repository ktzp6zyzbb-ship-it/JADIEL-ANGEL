#!/usr/bin/env python3
"""Command-line RFID attendance system.

Menu-driven CLI to register students against their RFID tag, take
attendance by scanning tags, list attendance/registered students, and
reset the database.
"""
import sys
from datetime import date

from db import Database
from reader import ReaderError, get_reader

MENU = """
==================================
      RFID Attendance System
==================================
1. Register new student
2. Take attendance (scan tags)
3. List attendance records
4. List registered students
5. Reset database
6. Exit
"""


def register_student(db, reader):
    print("\n-- Register Student --")
    try:
        tag = reader.read_tag("Scan the student's card (or type tag ID): ")
    except ReaderError as exc:
        print(f"Reader error: {exc}")
        return
    if not tag:
        print("No tag scanned. Cancelled.")
        return

    existing = db.find_student_by_tag(tag)
    if existing:
        print(f"This tag is already registered to {existing['name']} ({existing['student_id']}).")
        return

    student_id = input("Student ID: ").strip()
    if not student_id:
        print("Student ID is required. Cancelled.")
        return
    if db.student_id_exists(student_id):
        print("A student with that ID is already registered.")
        return

    name = input("Full name: ").strip()
    if not name:
        print("Name is required. Cancelled.")
        return

    db.add_student(tag, student_id, name)
    print(f"Registered {name} ({student_id}) with tag {tag}.")


def take_attendance(db, reader):
    print("\n-- Take Attendance --")
    print("Scan cards to mark attendance. Type 'done' or press Ctrl+C to stop.\n")
    today = date.today().isoformat()
    while True:
        try:
            tag = reader.read_tag("Scan card: ")
        except ReaderError as exc:
            print(f"Reader error: {exc}")
            return
        if tag.lower() in ("done", "exit", "quit"):
            break
        if not tag:
            continue

        student = db.find_student_by_tag(tag)
        if not student:
            print(f"  Unknown tag '{tag}'. Register this student first.")
            continue
        if db.already_marked_on(student["id"], today):
            print(f"  {student['name']} already marked present today.")
            continue

        db.record_attendance(student)
        print(f"  Attendance marked: {student['name']} ({student['student_id']})")
    print("Stopped taking attendance.")


def list_attendance(db):
    print("\n-- Attendance Records --")
    today_only = input("Show today's records only? (Y/N): ").strip().lower() == "y"
    date_filter = date.today().isoformat() if today_only else None
    records = db.list_attendance(date_filter)
    if not records:
        print("No attendance records found.")
        return

    print(f"{'Timestamp':<20} {'Student ID':<12} {'Name':<25} Tag")
    print("-" * 75)
    for r in records:
        print(f"{r['timestamp']:<20} {r['student_id']:<12} {r['name']:<25} {r['rfid_tag']}")


def list_students(db):
    print("\n-- Registered Students --")
    students = db.list_students()
    if not students:
        print("No students registered.")
        return

    print(f"{'Student ID':<12} {'Name':<25} Tag")
    print("-" * 55)
    for s in students:
        print(f"{s['student_id']:<12} {s['name']:<25} {s['rfid_tag']}")


def reset_database(db):
    print("\n-- Reset Database --")
    confirm = input(
        "This will permanently delete ALL students and attendance records. Continue? (Y/N): "
    ).strip().lower()
    if confirm == "y":
        db.reset()
        print("Database has been reset.")
    else:
        print("Reset cancelled.")


def main():
    db = Database()
    try:
        reader = get_reader()
    except ReaderError as exc:
        print(f"Could not initialize RFID reader: {exc}")
        db.close()
        return 1

    try:
        while True:
            print(MENU)
            choice = input("Select an option: ").strip()
            if choice == "1":
                register_student(db, reader)
            elif choice == "2":
                take_attendance(db, reader)
            elif choice == "3":
                list_attendance(db)
            elif choice == "4":
                list_students(db)
            elif choice == "5":
                reset_database(db)
            elif choice == "6":
                print("Goodbye.")
                break
            else:
                print("Invalid option, please try again.")
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting.")
    finally:
        close = getattr(reader, "close", None)
        if close:
            close()
        db.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
