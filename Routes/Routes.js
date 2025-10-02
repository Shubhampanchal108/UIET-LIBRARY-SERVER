const express = require('express');
const Router = express.Router();

// Student Routes
Router.get('/ALLstudents');
Router.post('/LoginStudent');
Router.post('/SignUpStudent');
Router.get('/StudentProfile/:name');


// Books Routes
Router.get('/ALLbooks');
Router.post('/AddBook');
Router.get('/BookDetails/:id');
Router.delete('/DeleteBook/:id');
Router.put('/UpdateBook/:id');

// Reservation Routes
Router.post('/ReserveBook/:id');
Router.get('/ALLreservations');
Router.get('/StudentReservations/:userId');
Router.patch('/UpdateReservationStatus/:id/approve');
Router.patch('/UpdateReservationStatus/:id/reject');

// Borrow Routes
Router.post('/BorrowBook/:id');
Router.get('/ALLborrows');
Router.get('/StudentBorrows/:userId');
Router.patch('/ReturnBook/:id');



//Export the Router
module.exports = Router;
