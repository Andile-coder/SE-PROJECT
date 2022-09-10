import { Router, json } from 'express';
import { BookingController } from '../Controllers/Booking';

const router = Router();
const Controller = new BookingController();

router.get('/api/movies', (request, response, next) => {
  Controller.GetMovies(request, response, next);
});

router.post('/api/movie', json(), (request, response, next) => {
  Controller.Book(request, response, next);
});

router.post('/api/seats', json(), (request, response, next) => {
  Controller.GetAvailableSeats(request, response, next);
});
export default router;
