import { Request, Response, NextFunction } from 'express';
import { dbConfig } from '../Config/db.config';
import { APIError } from '../Middlewares/Error';
import { QueryConfig } from 'pg';

export class BookingController {
  public async Book(request: Request, response: Response, next: NextFunction) {
    const { email, firstname, lastname, seat, movie_id, timeBooked } = request.body;
    const pool = new dbConfig().getPool();

    if (!email || !firstname || !lastname || !seat || !movie_id || !timeBooked) {
      next(APIError.badRequest('All fields are required to book a ticket'));
    }

    const query: QueryConfig = {
      text: 'INSERT INTO Booking (movie_id, seat, payment_status, timeBooked) VALUES ($1, $2, $3, $4)',
      values: [movie_id, seat, 'Payment Success', timeBooked],
    };

    try {
      const pgClient = await pool.connect();
      await pgClient.query(query);

      pgClient.release();
      return response.status(200).json({ msg: 'Movie successfully booked', seatBooked: seat, movieID: movie_id });
    } catch (error) {
      if (error.constraint === 'booking_movie_id_seat_timebooked_key') {
        return next(
          APIError.badRequest(`Seat ${seat} scheduled for ${timeBooked}pm, has been booked for for this movie select another`)
        );
      }
      return next(APIError.internalError(error));
    }
  }

  public async GetMovies(request: Request, response: Response, next: NextFunction) {
    const pool = new dbConfig().getPool();
    try {
      const pgClient = await pool.connect();
      const query: QueryConfig = {
        text: 'SELECT id, name, description, age_restriction, date_of_showing, poster, price FROM Movie',
      };
      const movies = (await pgClient.query(query)).rows;

      pgClient.release();
      return response.status(200).json(movies);
    } catch (error) {
      return next(APIError.internalError('Network Error: Failed to get movis'));
    }
  }

  public async GetAvailableSeats(request: Request, response: Response, next: NextFunction) {
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
      return next(APIError.badRequest('Movie ID & Time is required to get seats for movies'));
    }

    const query: QueryConfig = {
      text: 'SELECT seat FROM Booking WHERE movie_id = $1 AND timeBooked = $2',
      values: [movie_id, time],
    };

    const pool = new dbConfig().getPool();

    try {
      const pgClient = await pool.connect();
      const bookedSeats: any = (await pgClient.query(query)).rows;

      const flatArray = this.flattenArray(bookedSeats);

      for (let i = 0; i < seats.length; i++) {
        if (flatArray.includes(seats[i].seat)) {
          seats[i].isAvailable = false;
        }
      }

      pgClient.release();
      return response.status(200).json(seats);
    } catch (error) {
      console.log(`Booking - 231`, error);
      return next(APIError.internalError('Network Error: Failed to get seats for this movie'));
    }
  }

  private flattenArray(arr: [{ seat: string }]) {
    const result = [];

    for (let seat of arr) {
      result.push(seat.seat);
    }
    return result;
  }
}
