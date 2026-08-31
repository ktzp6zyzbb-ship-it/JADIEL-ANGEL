"""RFID reader abstraction.

Most low-cost USB RFID readers enumerate as a USB HID keyboard: scanning a
card "types" its tag ID followed by Enter into whatever has focus. That is
the default mode here (``keyboard``) and needs no extra drivers -- it just
reads a line from stdin, which also makes the whole CLI testable without any
hardware attached.

For a reader wired to a serial port (e.g. an Arduino + MFRC522 sketch that
writes the tag UID to its serial connection), set the environment variable
RFID_READER_MODE=serial and configure RFID_SERIAL_PORT / RFID_SERIAL_BAUD.
"""
import os


class ReaderError(Exception):
    """Raised when a tag could not be read from the configured reader."""


class KeyboardWedgeReader:
    """Reads a tag ID typed by a HID-emulating RFID reader (or by hand)."""

    def read_tag(self, prompt="Scan card (or type tag ID): "):
        try:
            return input(prompt).strip()
        except EOFError:
            raise ReaderError("input closed") from None


class SerialReader:
    """Reads tag IDs streamed as lines from a serial-connected RFID reader."""

    def __init__(self, port=None, baudrate=None, timeout=5):
        try:
            import serial
        except ImportError as exc:
            raise ReaderError(
                "pyserial is required for serial mode: pip install pyserial"
            ) from exc

        port = port or os.environ.get("RFID_SERIAL_PORT", "/dev/ttyUSB0")
        baudrate = baudrate or int(os.environ.get("RFID_SERIAL_BAUD", "9600"))
        try:
            self._serial = serial.Serial(port, baudrate, timeout=timeout)
        except serial.SerialException as exc:
            raise ReaderError(f"could not open serial port {port}: {exc}") from exc

    def read_tag(self, prompt="Waiting for card scan..."):
        print(prompt)
        while True:
            raw = self._serial.readline().decode("utf-8", errors="ignore").strip()
            if raw:
                return raw

    def close(self):
        self._serial.close()


def get_reader():
    """Build the reader selected by RFID_READER_MODE (default: keyboard)."""
    mode = os.environ.get("RFID_READER_MODE", "keyboard").lower()
    if mode == "serial":
        return SerialReader()
    return KeyboardWedgeReader()
