"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const db_config_1 = require("../Config/db.config");
const Error_1 = require("../Middlewares/Error");
class BookingController {
    Book(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, firstname, lastname, seat, movie_id, timeBooked } = request.body;
            const pool = new db_config_1.dbConfig().getPool();
            if (!email || !firstname || !lastname || !seat || !movie_id || !timeBooked) {
                next(Error_1.APIError.badRequest('All fields are required to book a ticket'));
            }
            const query = {
                text: 'INSERT INTO Booking (movie_id, seat, payment_status, timeBooked) VALUES ($1, $2, $3, $4)',
                values: [movie_id, seat, 'Payment Success', timeBooked],
            };
            try {
                const pgClient = yield pool.connect();
                yield pgClient.query(query);
                pgClient.release();
                return response.status(200).json({ msg: 'Movie successfully booked', seatBooked: seat, movieID: movie_id });
            }
            catch (error) {
                if (error.constraint === 'booking_movie_id_seat_timebooked_key') {
                    return next(Error_1.APIError.badRequest(`Seat ${seat} scheduled for ${timeBooked}pm, has been booked for for this movie select another`));
                }
                return next(Error_1.APIError.internalError(error));
            }
        });
    }
    GetMovies(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = new db_config_1.dbConfig().getPool();
            try {
                const pgClient = yield pool.connect();
                const query = {
                    text: 'SELECT id, name, description, age_restriction, date_of_showing, poster, price FROM Movie',
                };
                const movies = (yield pgClient.query(query)).rows;
                pgClient.release();
                return response.status(200).json(movies);
            }
            catch (error) {
                return next(Error_1.APIError.internalError('Network Error: Failed to get movis'));
            }
        });
    }
    GetAvailableSeats(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const seats = [
                {
                    seat: 'A1',
                    isAvailable: true,
                },
                {
                    seat: 'A2',
                    isAvailable: true,
                },
                {
                    seat: 'A3',
                    isAvailable: true,
                },
                {
                    seat: 'A4',
                    isAvailable: true,
                },
                {
                    seat: 'A5',
                    isAvailable: true,
                },
                {
                    seat: 'A6',
                    isAvailable: true,
                },
                {
                    seat: 'A7',
                    isAvailable: true,
                },
                {
                    seat: 'A8',
                    isAvailable: true,
                },
                {
                    seat: 'A9',
                    isAvailable: true,
                },
                {
                    seat: 'A10',
                    isAvailable: true,
                },
                {
                    seat: 'B1',
                    isAvailable: true,
                },
                {
                    seat: 'B2',
                    isAvailable: true,
                },
                {
                    seat: 'B3',
                    isAvailable: true,
                },
                {
                    seat: 'B4',
                    isAvailable: true,
                },
                {
                    seat: 'B5',
                    isAvailable: true,
                },
                {
                    seat: 'B6',
                    isAvailable: true,
                },
                {
                    seat: 'B7',
                    isAvailable: true,
                },
                {
                    seat: 'B8',
                    isAvailable: true,
                },
                {
                    seat: 'B9',
                    isAvailable: true,
                },
                {
                    seat: 'B10',
                    isAvailable: true,
                },
                {
                    seat: 'C1',
                    isAvailable: true,
                },
                {
                    seat: 'C2',
                    isAvailable: true,
                },
                {
                    seat: 'C3',
                    isAvailable: true,
                },
                {
                    seat: 'C4',
                    isAvailable: true,
                },
                {
                    seat: 'C5',
                    isAvailable: true,
                },
                {
                    seat: 'C6',
                    isAvailable: true,
                },
                {
                    seat: 'C7',
                    isAvailable: true,
                },
                {
                    seat: 'C8',
                    isAvailable: true,
                },
                {
                    seat: 'C9',
                    isAvailable: true,
                },
                {
                    seat: 'C10',
                    isAvailable: true,
                },
                {
                    seat: 'D1',
                    isAvailable: true,
                },
                {
                    seat: 'D2',
                    isAvailable: true,
                },
                {
                    seat: 'D3',
                    isAvailable: true,
                },
                {
                    seat: 'D4',
                    isAvailable: true,
                },
                {
                    seat: 'D5',
                    isAvailable: true,
                },
                {
                    seat: 'D6',
                    isAvailable: true,
                },
                {
                    seat: 'D7',
                    isAvailable: true,
                },
                {
                    seat: 'D8',
                    isAvailable: true,
                },
                {
                    seat: 'D9',
                    isAvailable: true,
                },
                {
                    seat: 'D10',
                    isAvailable: true,
                },
            ];
            const { movie_id, time } = request.body;
            if (!movie_id || !time) {
                return next(Error_1.APIError.badRequest('Movie ID & Time is required to get seats for movies'));
            }
            const query = {
                text: 'SELECT seat FROM Booking WHERE movie_id = $1 AND timeBooked = $2',
                values: [movie_id, time],
            };
            const pool = new db_config_1.dbConfig().getPool();
            try {
                const pgClient = yield pool.connect();
                const bookedSeats = (yield pgClient.query(query)).rows;
                const flatArray = this.flattenArray(bookedSeats);
                for (let i = 0; i < seats.length; i++) {
                    if (flatArray.includes(seats[i].seat)) {
                        seats[i].isAvailable = false;
                    }
                }
                pgClient.release();
                return response.status(200).json(seats);
            }
            catch (error) {
                console.log(`Booking - 231`, error);
                return next(Error_1.APIError.internalError('Network Error: Failed to get seats for this movie'));
            }
        });
    }
    flattenArray(arr) {
        const result = [];
        for (let seat of arr) {
            result.push(seat.seat);
        }
        return result;
    }
}
exports.BookingController = BookingController;
//# sourceMappingURL=Booking.js.map