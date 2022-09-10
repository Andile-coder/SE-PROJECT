CREATE TABLE Movie (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  age_restriction AgeRestriction,
  date_of_showing Date NOT NULL,
  poster varchar(255) NOT NULL,
  price NUMERIC(5, 2) NOT NULL
);



