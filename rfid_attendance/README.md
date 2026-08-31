# RFID Attendance System

A menu-driven Python command-line tool for taking attendance with an RFID
card reader. Stores students and attendance records in a local SQLite
database (`attendance.db`, created automatically on first run).

## Requirements

- Python 3.8+
- No third-party packages needed for the default reader mode (a USB RFID
  reader that emulates a keyboard).
- `pyserial` only if you use a serial-connected reader (see below):

  ```
  pip install -r requirements.txt
  ```

## Running

```
cd rfid_attendance
python3 main.py
```

You'll get a menu:

```
1. Register new student
2. Take attendance (scan tags)
3. List attendance records
4. List registered students
5. Reset database
6. Exit
```

- **Register new student**: scan (or type) the student's tag, then enter
  their student ID and name.
- **Take attendance**: repeatedly scan cards; each recognized tag is
  marked present for today (once per day per student). Type `done` to
  stop.
- **List attendance**: view all records, or filter to today only.
- **List registered students**: view everyone registered.
- **Reset database**: wipes all students and attendance after a `Y/N`
  confirmation.

## RFID reader modes

Set the `RFID_READER_MODE` environment variable to choose how tags are
read:

- `keyboard` (default) — for USB RFID readers that act as a HID keyboard:
  scanning a card "types" the tag ID followed by Enter. This also lets you
  test the whole app by typing tag IDs by hand, with no hardware attached.
- `serial` — for readers wired to a serial port (e.g. an Arduino running
  an MFRC522 sketch that writes each scanned UID to its serial output).
  Configure the port/baud rate with:

  ```
  export RFID_READER_MODE=serial
  export RFID_SERIAL_PORT=/dev/ttyUSB0   # or COM3 on Windows
  export RFID_SERIAL_BAUD=9600
  ```

## Data

- `db.py` — SQLite schema and queries (`students`, `attendance` tables).
- `reader.py` — pluggable RFID reader abstraction (keyboard-wedge or
  serial).
- `main.py` — the CLI menu and application logic.

`attendance.db` is created next to these files and is git-ignored.
