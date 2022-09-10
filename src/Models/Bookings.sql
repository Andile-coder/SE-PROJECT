CREATE TABLE Booking (
  id BIGSERIAL PRIMARY KEY,
  movie_id INTEGER REFERENCES Movie(id) ON DELETE CASCADE ON UPDATE NO ACTION NOT NULL,
  seat Seat NOT NULL,
  payment_status PaymentStatus NOT NULL,
  timeBooked ShowTime NOT NULL,
  
  -- This constrainst is for blocking duplicate seat getting booked for the same movie shown in same time
  UNIQUE (movie_id, seat, timeBooked)
); 