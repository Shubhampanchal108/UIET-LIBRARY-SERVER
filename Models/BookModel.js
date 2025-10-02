const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    forWhichYear: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
    },
    totalCopy: {
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
