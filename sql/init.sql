CREATE DATABASE IF NOT EXISTS MovieMate;
USE MovieMate;

CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_role ENUM('ADMIN','REGULAR') DEFAULT 'REGULAR',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    release_year YEAR,
    genre_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
      ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    review_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
      ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
      ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating_value INT CHECK (rating_value BETWEEN 1 AND 5),
    rated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
      ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
      ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (user_id, movie_id)
);

-- Default passwords: admin123 for admin, user123 for regular user
INSERT INTO Users (username, email, password_hash, user_role)
VALUES
('AdminUser', 'admin@moviemate.com', '$2b$10$izS7xQcwMfl3/paM0IRiSuIiw3xYE5uU.F5rH977nlPsOUqRFCbMC', 'ADMIN'),
('JohnDoe', 'john@example.com', '$2b$10$9VGuuVFXC0ib5ZB5WzbTlem1BRAOZqAKq/1XLSdq4tt4x/QQecuwC', 'REGULAR');

INSERT INTO Genres (genre_name)
VALUES ('Action'), ('Comedy'), ('Drama'), ('Sci-Fi'), ('Horror');

INSERT INTO Movies (title, description, release_year, genre_id)
VALUES 
('Inception', 'A thief who steals corporate secrets through dream-sharing technology.', 2010, 4),
('The Dark Knight', 'Batman faces the Joker in Gotham City.', 2008, 1),
('Forrest Gump', 'Life story of Forrest Gump, a man with a kind heart.', 1994, 3),
('The Conjuring', 'Paranormal investigators help a family terrorized by dark forces.', 2013, 5),
('The Hangover', 'Three friends lose the groom after a bachelor party in Las Vegas.', 2009, 2);

INSERT INTO Reviews (user_id, movie_id, review_text)
VALUES
(2, 1, 'Inception was mind-bending and visually stunning!'),
(2, 2, 'The Dark Knight redefined superhero movies. Amazing performance by Heath Ledger.'),
(1, 3, 'Forrest Gump is timeless and full of emotion. A true classic.'),
(2, 4, 'The Conjuring was genuinely terrifying. Excellent horror film.'),
(1, 5, 'The Hangover is hilarious from start to finish.');

INSERT INTO Ratings (user_id, movie_id, rating_value)
VALUES
(2, 1, 5),
(2, 2, 5),
(1, 3, 4),
(2, 4, 4),
(1, 5, 3);
