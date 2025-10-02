# 📚 Library Management System – Backend (MERN Stack)

This is the **backend** for the Library Management System built using **Node.js, Express.js, and MongoDB**.
It handles authentication, book management, reservations, borrowing, and returning of books.

---

## 🚀 Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB + Mongoose
* **Auth**: JWT (JSON Web Tokens)
* **Scheduler**: Node-Cron (for reservation expiry)

---

## 🏗 Folder Structure

```
backend/
 ├── index.js           # Entry point
 ├── config/
 │    └── Database.js          # MongoDB connection
 ├── models/             # Mongoose models
 │    ├── UserModels.js
 │    ├── BookModel.js
 │    ├── ReservationModel.js
 │    └── BorrowModel.js
 ├── routes/             # API routes
 │    |-- Routes.js
 ├── controllers/        # Controllers (business logic)
 │    ├── authController.js
 │    ├── bookController.js
 │    ├── reservationController.js
 │    └── borrowController.js
 ├── middlewares/        # Middlewares (Auth, Roles)
 │    └── authMiddleware.js
 └── utils/
      └── cronJobs.js    # Reservation expiry scheduler
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <repo-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in root:

```
PORT=5000
MONGO_URI=mongodb+srv://<your-mongodb-uri>
JWT_SECRET=your_jwt_secret
```

### 4. Run Server

```bash
npm run server
```

Server will run on: `http://localhost:5000`

---

## 🔑 Roles

* **Super Admin** → Can manage librarians + see reports
* **Librarian** → Add books, approve reservations, issue/return books
* **Student** → Search books, reserve, borrow

---

## 📌 API Endpoints

### 🔹 student

* `POST /api/auth/register` → Register (student, librarian, admin)
* `POST /api/auth/login` → Login + get JWT

### 🔹 Books

* `GET /api/books?search=keyword` → Search books
* `POST /api/books` (librarian only) → Add new book
* `PATCH /api/books/:id` (librarian only) → Update book info
* `DELETE /api/books/:id` (librarian only) → Delete book

### 🔹 Reservation

* `POST /api/reservations/:bookId` (student) → Reserve book
* `GET /api/reservations` (student → own, librarian → all)
* `PATCH /api/reservations/:id/approve` (librarian) → Approve reservation (2-day validity)
* `PATCH /api/reservations/:id/reject` (librarian) → Reject reservation

### 🔹 Borrow (Issue/Return)

* `POST /api/borrow/:reservationId` (librarian) → Issue book
* `PATCH /api/borrow/:id/return` (librarian) → Mark book returned
* `GET /api/borrow` (student → own books, librarian → all)

---

## ⏳ Reservation Expiry

* Every night at **12:00 AM**, a cron job runs.
* It marks **expired reservations** if 2 days pass without student picking the book.
* Expired books are auto-added back to `availableCopies`.

---

## 🔗 Frontend Integration

When connecting frontend:

* Every request must include **JWT Token** in headers:

```json
{
  "Authorization": "Bearer <your-token>"
}
```

* Example: Search Books

```js
fetch("http://localhost:5000/api/books?search=java", {
  method: "GET",
  headers: {
    "Authorization": "Bearer token_here"
  }
})
```

* Example: Reserve a Book (student)

```js
fetch("http://localhost:5000/api/reservations/BOOK_ID", {
  method: "POST",
  headers: {
    "Authorization": "Bearer token_here"
  }
})
```

---

## 📊 Future Features

* Fine management system
* Email/SMS notifications
* Analytics dashboard

Chal bhai bata, tujhe is README me **API request examples (Postman style JSON payloads)** bhi daal du taaki aur clear ho frontend waalo ko?
