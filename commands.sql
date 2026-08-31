CREATE TABLE blogs ( 
  id SERIAL PRIMARY KEY, 
  author TEXT,
  url TEXT NOT NULL, 
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0);

INSERT INTO blogs (author, url, title, likes) VALUES ('nimma', 'https://somethiing.com', 'something', 10);
INSERT INTO blogs (author, url, title, likes) VALUES ('nimma', 'https://nothing.com', 'nothing', 0);