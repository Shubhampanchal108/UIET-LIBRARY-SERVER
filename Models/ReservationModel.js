const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    _id: ObjectId,
    userId: { type: ObjectId, ref: 'User', required: true },
    bookId: { type: ObjectId, ref: 'Book', required: true },
    status: { type: String, enum: ['approved', 'pending', 'rejected', 'expired'], default: 'pending' },
    reservationDate: { type: Date, default: Date.now },
    validTill: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;