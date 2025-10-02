const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    _id: ObjectId,
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    TotalCopy: {
        type: Number,
        required: true,
    },
    availableCopy: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
