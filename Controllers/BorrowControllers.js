const Borrow = require('../Models/Borrow_Model');
const Book = require('../Models/BookModel');
const Reservation = require('../Models/ReservationModel');
const User = require("../Models/userModel");

//All Borrowed Books
const showAllBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find().populate('userId').populate('bookId');
        return res.status(200).send({
            message: "All borrowed books retrieved successfully",
            borrows
        });
    } catch (error) {
        console.error("Error retrieving borrowed books:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

// Show Student Borrowed Books
const showStudentBorrows = async (req, res) => {
    try {
        const userId = req.params.userId;
        const borrows = await Borrow.find({ userId }).populate('bookId');
        return res.status(200).send({
            message: "Student borrowed books retrieved successfully",
            borrows
        });
    } catch (error) {
        console.error("Error retrieving student borrowed books:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};
// Borrow a Book
const borrowBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { userId , dueDate} = req.body;

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

        // Check if the user is already borrowed this book
        const existingBorrow = await Borrow.findOne({ userId, bookId });
        if (existingBorrow) {
            return res.status(400).send({ message: "You have already borrowed this book" });
        }  

        // Check if the user has an approved reservation for this book
        const reservation = await Reservation.findOne({ userId, bookId, status: 'approved' });
        if (!reservation) {
            return res.status(400).send({ message: "You must have an approved reservation to borrow this book" });
        }

        // Create a new borrow record
        const borrow = new Borrow({
            userId,
            bookId,
            dueDate
        });
        await borrow.save();

        return res.status(201).send({
            message: "Book borrowed successfully",
            borrow
        });
    } catch (error) {
        console.error("Error borrowing book:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};


// Return a Book
const returnBook = async (req, res) => {
    try {
        const borrowId = req.params.id;

        // Find the borrow record
        const borrow = await Borrow.findById(borrowId);
        if (!borrow) {
            return res.status(404).send({ message: "Borrow record not found" });
        }

        // Remove the borrow record
        await Borrow.findByIdAndDelete(borrowId);

        //increase book Avialible Copy by 1
        await Book.findByIdAndUpdate(borrow.bookId, { $inc: { availableCopy: 1 } });

        return res.status(200).send({
            message: "Book returned successfully",
            borrow
        });
    } catch (error) {
        console.error("Error returning book:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

module.exports = {
    showAllBorrows,
    showStudentBorrows,
    borrowBook,
    returnBook
};