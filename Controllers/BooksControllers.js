const booksModel = require("../Models/BookModel");

//Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await booksModel.find();
    return res.status(200).send({
      message: "Books retrieved successfully",
      books
    });
  } catch (error) {
    console.error("Error retrieving books:", error);
    return res.status(500).send({
      message: "Internal server error"
    });
  }
};

//Add a Book
const addBook = async (req, res) => {
  try {
    const { title, author, forWhichYear, totalCopy, availableCopy } = req.body;
    const newBook = new booksModel({
      title,
      author,
      forWhichYear,
      totalCopy,
      availableCopy
    });
    await newBook.save();
    return res.status(201).send({
      message: "Book added successfully",
      book: newBook
    });
  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).send({
      message: "Internal server error"
    });
  }
};

module.exports = {
  getAllBooks,
  addBook
};