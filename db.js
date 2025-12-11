const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('booking.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS slots(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doctor_name TEXT,
      start_time TEXT,
      total_seats INTEGER,
      available_seats INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slot_id INTEGER,
      seats INTEGER,
      status TEXT,
      FOREIGN KEY(slot_id) REFERENCES slots(id)
    )
  `);
});

module.exports = db;
