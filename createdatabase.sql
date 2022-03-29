/*
run mysql on terminal:
$ mysql

change credentials to match the program:
$ mysql> ALTER USER 'root' @'localhost' IDENTIFIED WITH mysql_native_password BY 'group8superpass';

load the database:
$ mysql> source createdatabase.sql

in VSCode, can download mysql extension and connect to 127.0.0.1:3306

*/

CREATE DATABASE `group8`;
USE `group8`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
	`user_id` int NOT NULL,
	`email` varchar(50),
	`username` varchar(50) NOT NULL,
	PRIMARY KEY (`user_id`, `username`)
);

insert into `users`(`user_id`, `email`, `username`) values
	(000001, 'user1@gmail.com', 'user1'),
	(000002, 'user2@gmail.com', 'user2'),
	(000003, 'user3@gmail.com', 'user3');
