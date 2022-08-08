USE sys;

DROP DATABASE IF EXISTS node_homework;
CREATE DATABASE IF NOT EXISTS node_homework;
USE node_homework;

DROP TABLE IF EXISTS comment_like;
DROP TABLE IF EXISTS article_like;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS user;


CREATE TABLE IF NOT EXISTS user (
	user_id 	INTEGER 		NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nickname	VARCHAR(15)		NOT NULL UNIQUE,
    password 	VARCHAR(255)	NOT NULL
);

CREATE TABLE IF NOT EXISTS article (
	article_id	INTEGER			NOT	NULL AUTO_INCREMENT PRIMARY KEY,
    user_id		INTEGER			NOT NULL REFERENCES user (user_id),
    title		VARCHAR(50)		NOT NULL,
    content		VARCHAR(250)	NOT NULL
);

CREATE TABLE IF NOT EXISTS comment (
	comment_id	INTEGER			NOT NULL AUTO_INCREMENT PRIMARY KEY,
    article_id	INTEGER			NOT NULL REFERENCES article (article_id),
    user_id		INTEGER			NOT NULL REFERENCES user (user_id),
    content		VARCHAR(250)	NOT NULL
);

CREATE TABLE IF NOT EXISTS article_like (
	like_id		INTEGER			NOT NULL AUTO_INCREMENT PRIMARY KEY,
    article_id  INTEGER			NOT NULL REFERENCES article (article_id),
    user_id 	INTEGER			NOT NULL REFERENCES user (user_id),
    is_liked	BOOLEAN			NOT NULL
);

CREATE TABLE IF NOT EXISTS comment_like (
	like_id		INTEGER			NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comment_id	INTEGER			NOT NULL REFERENCES comment (comment_id),
    user_id 	INTEGER			NOT NULL REFERENCES user (user_id),
    is_liked	BOOLEAN			NOT NULL
);