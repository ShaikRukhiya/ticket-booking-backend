const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Ticket Booking Backend Running");
});

/************ ADMIN CREATE SLOT ************/
app.post("/admin/slot", (req, res) => {
    const { doctor_name, start_time, total_seats } = req.body;

    if (!doctor_name || !start_time || !total_seats) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.run(
        `INSERT INTO slots(doctor_name,start_time,total_seats,available_seats)
         VALUES (?,?,?,?)`,
        [doctor_name, start_time, total_seats, total_seats],
        function (err) {
            if (err) return res.status(500).json({ error: err });

            res.json({ message: "Slot created", id: this.lastID });
        }
    );
});

/************ USER — GET ALL SLOTS ************/
app.get("/slots", (req, res) => {
    db.all(`SELECT * FROM slots`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
});

/************ USER — BOOK SEATS ************/
app.post("/book", (req, res) => {
    const { slot_id, seats } = req.body;

    if (!slot_id || !seats)
        return res.status(400).json({ error: "Slot id & seats are required" });

    db.serialize(() => {
        db.get(`SELECT available_seats FROM slots WHERE id=?`, [slot_id], (err, slot) => {
            if (!slot) return res.json({ status: "FAILED", message: "Slot not found" });

            if (slot.available_seats < seats) {
                return res.json({
                    status: "FAILED",
                    message: "Not enough seats. Overbooking prevented"
                });
            }

            const newSeats = slot.available_seats - seats;

            db.run(`UPDATE slots SET available_seats=? WHERE id=?`, [newSeats, slot_id]);

            db.run(
                `INSERT INTO bookings(slot_id,seats,status) VALUES (?,?,?)`,
                [slot_id, seats, "CONFIRMED"]
            );

            res.json({ status: "CONFIRMED" });
        });
    });
});

/************ USER — GET BOOKING LIST ************/
app.get("/bookings", (req, res) => {
    db.all(`SELECT * FROM bookings`, [], (err, rows) => {
        if (err) return res.json({ error: err });
        res.json(rows);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
