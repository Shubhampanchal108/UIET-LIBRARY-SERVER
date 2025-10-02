const express = require("express");
const Router = express.Router();

const {
  getAllUsers,
  signupController,
  getUserProfile,
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
Router.get("/ALLstudents", getAllUsers);
Router.post("/LoginStudent");
Router.post("/SignUpStudent", signupController);
Router.get("/StudentProfile/:RollNo", getUserProfile);

// Books Routes
Router.get("/ALLbooks", getAllBooks);
Router.post("/AddBook", addBook);
Router.get("/BookDetails/:id");
Router.delete("/DeleteBook/:id");
Router.patch("/UpdateBook/:id");

// Reservation Routes
Router.post("/ReserveBook/:id", reserveBook);
Router.get("/ALLreservations", showAllReservation);
Router.get("/StudentReservations/:userId", showStudentReservation);
Router.patch("/approveReservation/:id", ApproveReservation);
Router.patch("/rejectReservation/:id", rejectReservation);

// Borrow Routes
Router.post("/BorrowBook/:id", borrowBook);
Router.get("/ALLborrows", showAllBorrows);
Router.get("/StudentBorrows/:userId", showStudentBorrows);
Router.patch("/ReturnBook/:id", returnBook);

//Export the Router
module.exports = Router;
