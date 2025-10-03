const mongoose = require('mongoose');

const reqBookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    forWhichYear: {
        type: String,
        enum: ['1', '2', '3', '4'],
        required: true,
    },
    forWhichBranch: {
        type: String,
        enum: ['CSE', 'ECE', 'EE', 'ME', 'ECO', 'AI-ML', 'BIO-TECH'],
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const reqBookModel = mongoose.model('RequestedBook', reqBookSchema);
module.exports = reqBookModel;
