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

//fetching book details
const bookDetails=async(req,res)=>{
    try{
        const books = await booksModel.find().populate( 'userId');
          return res.send(books);
    }
 catch (error) {
    res.status(500).send({ message: 'Failed to fetch books', error });
  }
}

// Delete a book
const deleteBook= async (req, res) => {
  try {
    const deletedBook = await booksModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).send({ message: 'Book not found' });
    res.send({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete book', error });
  }
};

//for updating a book
const updateBook= async (req, res) => {
  try {
    const updatedBook = await booksModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).send({ message: 'Book not found' });
    res.send({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).send({ message: 'Failed to update book', error });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  bookDetails,
  deleteBook,
  updateBook,
};