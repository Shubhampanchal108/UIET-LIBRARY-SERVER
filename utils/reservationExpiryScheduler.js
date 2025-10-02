const ReservationModel = require('../Models/ReservationModel');
const Book = require('../Models/BookModel');
const cron = require('node-cron');

cron.schedule('0 0 * * *', async () => {
  const expired = await ReservationModel.find({ status: 'approved', validTill: { $lt: new Date() } });
  expired.forEach(async (r) => {
    r.status = 'expired';
    await r.save();
    const book = await Book.findById(r.bookId);
    book.availableCopy += 1;
    await book.save();
  });
});

module.exports = cron;