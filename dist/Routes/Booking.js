"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Booking_1 = require("../Controllers/Booking");
const router = (0, express_1.Router)();
const Controller = new Booking_1.BookingController();
router.get('/api/movies', (request, response, next) => {
    Controller.GetMovies(request, response, next);
});
router.post('/api/movie', (0, express_1.json)(), (request, response, next) => {
    Controller.Book(request, response, next);
});
router.get('/api/seats', (0, express_1.json)(), (request, response, next) => {
    Controller.GetAvailableSeats(request, response, next);
});
exports.default = router;
//# sourceMappingURL=Booking.js.map