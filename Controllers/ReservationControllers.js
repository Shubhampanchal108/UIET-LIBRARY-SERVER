const Reservation = require("../Models/ReservationModel");
const Book = require("../Models/BookModel");
const User = require("../Models/userModel");


//All Reservation
const showAllReservation = async(req, res) => {
    try {
        const reservations = await Reservation.find().populate('userId').populate('bookId');
        return res.status(200).send({
            message: "All reservations retrieved successfully",
            reservations
        });
    } catch (error) {
        console.error("Error retrieving reservations:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

//Show Student Reservation
const showStudentReservation = async(req, res) => {
    try {
        const userId = req.params.userId;
        const reservations = await Reservation.find({ userId }).populate('bookId');
        return res.status(200).send({
            message: "Student reservations retrieved successfully",
            reservations
        });
    } catch (error) {
        console.error("Error retrieving student reservations:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

//Reserve a Book
const reserveBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { userId } = req.body;

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    //one use can reserve only one copy of a book at a time
    const existingReservation = await Reservation.findOne({ userId, bookId, status: { $in: ['approved', 'pending'] } });
    if (existingReservation) {
      return res.status(400).send({ message: "You have already reserved this book" });
    }

    // Create a new reservation
    const reservation = new Reservation({
      bookId: bookId,
      userId: userId,
      validTill: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Reservation valid for 2 days
    });
    await reservation.save();

    //decrease the available copy of the book by 1
    book.availableCopy -= 1;
    await book.save();

    return res.status(201).send({
      message: "Book reserved successfully",
      reservation
    });
  } catch (error) {
    console.error("Error reserving book:", error);
    return res.status(500).send({
      message: "Internal server error"
    });
  }
};


//Approve reservation status (approve) - Admin only
const ApproveReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).send({ message: "Reservation not found" });
        }

        reservation.status = 'approved';
        await reservation.save();

        return res.status(200).send({
            message: `Reservation approved successfully`,
            reservation
        });
    } catch (error) {
        console.error("Error updating reservation status:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

//Reject reservation - Admin only
const rejectReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).send({ message: "Reservation not found" });
        }

        reservation.status = 'rejected';
        await reservation.save();

        return res.status(200).send({
            message: "Reservation rejected successfully",
            reservation
        });
    } catch (error) {
        console.error("Error rejecting reservation:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

module.exports = {
  reserveBook,
  showAllReservation,
  showStudentReservation,
    ApproveReservation,
    rejectReservation
};
