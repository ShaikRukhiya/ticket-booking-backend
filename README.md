
# Ticket Booking Backend

A simple backend system for managing doctor appointment slots and bookings using Node.js, Express, and SQLite.

---

## Description

This backend allows you to:

- Admin can create appointment slots.
- Users can view available slots.
- Users can book seats in a slot.
- Prevents overbooking automatically.
- Maintains booking status (`CONFIRMED` / `FAILED`).

---

## Tech Stack

- Node.js
- Express
- SQLite (file-based database)
- CORS

---
ticket-booking-backend/
│
├── index.js # Main server file
├── db.js # Database setup
├── booking.db # SQLite database (auto-created)
├── package.json
├── package-lock.json
└── README.md

---

## Setup Instructions

1. Clone this repository:

```bash
git clone https://github.com/your-username/ticket-booking-backend.git
cd ticket-booking-backend
2.Install dependencies:

npm install
3. Start the server:

node index.js


4.The backend will run at:

http://localhost:3000
API Endpoints
Admin API

Create Slot

URL: /admin/slot

Method: POST

Body (JSON):{
  "doctor_name": "Dr. Reddy",
  "start_time": "10:00 AM",
  "total_seats": 10
}
Response
{
  "message": "Slot created",
  "id": 1
}
User APIs

Get All Slots

URL: /slots

Method: GET

Response:

[
  {
    "id": 1,
    "doctor_name": "Dr. Reddy",
    "start_time": "10:00 AM",
    "total_seats": 10,
    "available_seats": 10
  }
]
Book Seats

URL: /book

Method: POST

Body (JSON):

{
  "slot_id": 1,
  "seats": 2
}


Response:

{
  "status": "CONFIRMED"
}Get All Bookings

URL: /bookings

Method: GET

Response:

[
  {
    "id": 1,
    "slot_id": 1,
    "seats": 2,
    "status": "CONFIRMED"
  }
]
Deployment (Optional)

You can deploy this backend on Render or Railway:

Push your project to GitHub.

Create a new Web Service on Render / Railway.

Set Build Command:

npm install


Set Start Command:

node index.js


Deploy → Your backend will be live online.

## Folder Structure

