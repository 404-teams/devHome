DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS cdns;
DROP TABLE IF EXISTS jobs;


CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(55),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    image VARCHAR(255),
    status VARCHAR(255),
    rank INTEGER
);


CREATE TABLE questions
(
    id SERIAL PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    description TEXT,
    tags VARCHAR(255),
    code TEXT,
    rank INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE answers
(
    id SERIAL PRIMARY KEY,
    user_id INT,
    question_id INT,
    answer TEXT,
    description TEXT,
    code TEXT,
    rank INTEGER,
    approved BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);


CREATE TABLE jobs
(
    id SERIAL PRIMARY KEY,
    type VARCHAR(55),
    company VARCHAR(55),
    company_url VARCHAR(55),
    location VARCHAR(55),
    title VARCHAR(55),
    description TEXT,
    company_logo VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE cdns
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    latest VARCHAR(255),
    version VARCHAR(55),
    description TEXT,
    author VARCHAR(55),
    filename VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

