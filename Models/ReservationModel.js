const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    status: { type: String, enum: ['approved', 'pending', 'rejected', 'expired'], default: 'pending' },
    reservationDate: { type: Date, default: Date.now },
    validTill: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;