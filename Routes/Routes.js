const express = require("express");
const Router = express.Router();

const authenticateToken = require("../Middlewares/Auth");

const {
  getAllUsers,
  signupController,
  getUserProfile,
  loginController,
  requestBook,
  showAllRequestedBooks,
  AdminLoginController,
  appointAdmin
} = require("../Controllers/userControllers");

const { getAllBooks, addBook } = require("../Controllers/BooksControllers");

const {
  reserveBook,
  showAllReservation,
  showStudentReservation,
  ApproveReservation,
  rejectReservation,
} = require("../Controllers/ReservationControllers");

const {
  borrowBook,
  showAllBorrows,
  showStudentBorrows,
  returnBook,
} = require("../Controllers/BorrowControllers");

// Student Routes
Router.get("/ALLstudents", authenticateToken, getAllUsers);
Router.post("/LoginStudent", loginController);
Router.post("/SignUpStudent", signupController);
Router.get("/StudentProfile/:RollNo", authenticateToken, getUserProfile);
Router.post("/RequestBook", authenticateToken, requestBook);
Router.get("/ALLrequestedBooks", authenticateToken, showAllRequestedBooks);
Router.post('/loginAdmin', AdminLoginController);
Router.post('/appointAdmin', authenticateToken, appointAdmin);

// Books Routes
Router.get("/ALLbooks", authenticateToken, getAllBooks);
Router.post("/AddBook", authenticateToken, addBook);
Router.get("/BookDetails/:id", authenticateToken);
Router.delete("/DeleteBook/:id", authenticateToken);
Router.patch("/UpdateBook/:id", authenticateToken);

// Reservation Routes
Router.post("/ReserveBook/:id", authenticateToken, reserveBook);
Router.get("/ALLreservations", authenticateToken, showAllReservation);
Router.get("/StudentReservations/:userId", authenticateToken, showStudentReservation);
Router.patch("/approveReservation/:id", authenticateToken, ApproveReservation);
Router.patch("/rejectReservation/:id", authenticateToken, rejectReservation);

// Borrow Routes
Router.post("/BorrowBook/:id", authenticateToken, borrowBook);
Router.get("/ALLborrows", authenticateToken, showAllBorrows);
Router.get("/StudentBorrows/:userId", authenticateToken, showStudentBorrows);
Router.patch("/ReturnBook/:id", authenticateToken, returnBook);

//Export the Router
module.exports = Router;
