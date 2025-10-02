const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    _id: ObjectId,
    userId: { type: ObjectId, ref: 'User', required: true },
    bookId: { type: ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
});

const Borrow = mongoose.model('Borrow', borrowSchema);
module.exports = Borrow;
