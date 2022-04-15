/*
run mysql on terminal:
$ mysql

change credentials to match the program:
$ mysql> ALTER USER 'root' @'localhost' IDENTIFIED WITH mysql_native_password BY 'group8superpass';

load the database:
$ mysql> source createdatabase.sql

in VSCode, can download mysql extension and connect to 127.0.0.1:3306

--
cd /usr/local/mysql/bin
sudo mysql --password=group8superpass
source /Users/gkdub/Documents/CPSC471/actualproject/createdatabase.sql
*/


CREATE DATABASE `group8`;
USE `group8`;


DROP TABLE IF EXISTS `user_groups`;
DROP TABLE IF EXISTS `entry_groups`;
DROP TABLE IF EXISTS `location_profiles`;
DROP TABLE IF EXISTS `conditions`;



DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `entries`;

DROP TABLE IF EXISTS `admins`;
DROP TABLE IF EXISTS `groups`;
DROP TABLE IF EXISTS `users`;



/* 
Change to RM: ?
Does PK need to be both user_id and username
*/
CREATE TABLE `users` (
	`user_id` varchar(14) NOT NULL UNIQUE,
	`email` varchar(50),
	`username` varchar(20) NOT NULL UNIQUE,
	`password` varchar(20) NOT NULL,
	PRIMARY KEY (`user_id`, `username`)
);

CREATE TABLE `admins` (
  `admin_id` varchar(14) NOT NULL UNIQUE,
  `email` varchar(50),
  `username` varchar(20) NOT NULL UNIQUE,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`admin_id`, `username`)
);

/* 
Change to RM: 
'groups' won't store user ids

*/

CREATE TABLE `groups` (
  `group_id` varchar(14) NOT NULL UNIQUE,
  `name` varchar(20) NOT NULL UNIQUE,
  `owner` varchar(14) NOT NULL,
  PRIMARY KEY (`group_id`),
  FOREIGN KEY (`owner`) REFERENCES `users`(`user_id`)
);

/* 
Change to RM: 
Store 'groups' multi-valued attribute of user in a new table 

*/

CREATE TABLE `user_groups` (
  `user_id` varchar(14) NOT NULL UNIQUE,
  `group_id` varchar(14) NOT NULL,
  PRIMARY KEY (`user_id`, `group_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`group_id`) REFERENCES `groups`(`group_id`) ON DELETE CASCADE
);

/* 
Change to RM: 
Store 'auth_groups' multi-valued attribute of entry in a new table 

*/
CREATE TABLE `entries` (
  `entry_id` varchar(14) NOT NULL UNIQUE,
  `location` varchar(50),
  `date` varchar(14),
  `private_flag` int(1),
  `user_id` varchar(14) NOT NULL,
  `admin_id` varchar(14),
  `public_flag` int,
  PRIMARY KEY (`entry_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`admin_id`) REFERENCES `admins`(`admin_id`) ON DELETE SET NULL
);

CREATE TABLE `entry_groups` (
  `entry_id` varchar(14) NOT NULL UNIQUE,
  `group_id` varchar(14) NOT NULL,
  PRIMARY KEY (`entry_id`, `group_id`),
  FOREIGN KEY (`entry_id`) REFERENCES `entries`(`entry_id`) ON DELETE CASCADE,
  FOREIGN KEY (`group_id`) REFERENCES `groups`(`group_id`)
);

CREATE TABLE `reviews` (
  `entry_id` varchar(14) NOT NULL,
  `rating` varchar(14) NOT NULL,
  `user_id` varchar(14) NOT NULL,
  PRIMARY KEY (`entry_id`, `user_id`),
  FOREIGN KEY (`entry_id`) REFERENCES `entries`(`entry_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

CREATE TABLE `location_profiles` ( 
	`name` varchar(50) NOT NULL UNIQUE,
	`admin_id` varchar(14),
	`regulations` varchar(500),
	PRIMARY KEY (`name`),
	FOREIGN KEY (`admin_id`) REFERENCES `admins`(`admin_id`) ON DELETE SET NULL
);

CREATE TABLE `conditions` ( 
	`entry_id` varchar(14) NOT NULL UNIQUE,
	`water_flow` varchar(50),
	`water_visibility` varchar(50),
	`wind` varchar(50), 
	`sky` varchar(50),
	`temperature` varchar(5),
	PRIMARY KEY (`entry_id`),
	FOREIGN KEY (`entry_id`) REFERENCES `entries`(`entry_id`) ON DELETE CASCADE
);

-- Add Users
insert into `users`(`user_id`, `email`, `username`, `password`) values
	('tMYWeQDP-', 'user1@gmail.com', 'user1', '101010'),
	('2_C76miq0', 'user2@gmail.com', 'user2', '202020'),
	('yqQ01F11Y', 'user3@gmail.com', 'user3', '303030');

-- Add Admins
insert into `admins`(`admin_id`, `email`, `username`, `password`) values
	('keVTJhRTV', 'admin1@gmail.com', 'admin1', '404040'),
	('PPMf56O3x', 'admin2@gmail.com', 'admin2', '505050');

-- Add Groups
insert into `groups`(`group_id`, `name`, `owner`) values
	('WLxUlWmni', 'Super Flyfishers', '2_C76miq0');

-- Add user to group
insert into `user_groups`(`user_id`, `group_id`) values 
	('yqQ01F11Y', 'WLxUlWmni');

-- Add entry
insert into `entries`(`entry_id`, `location`, `date`, `private_flag`, `user_id`, `admin_id`, `public_flag`) values 
	('9ZKDVWzCf', 'Bow River', '1649950868', '0', 'tMYWeQDP-', 'keVTJhRTV', '1');

insert into `entries`(`entry_id`, `location`, `date`, `private_flag`, `user_id`, `admin_id`, `public_flag`) values 
	('5Ox7OjhHJ', 'Bow River', '1649950868', '1', 'tMYWeQDP-', 'keVTJhRTV', '0');

-- user yqQ01F11Y can access entry 5Ox7OjhHJ
insert into `entry_groups`(`entry_id`, `group_id`) values 
	('5Ox7OjhHJ', 'WLxUlWmni');

insert into `entries`(`entry_id`, `location`, `date`, `private_flag`, `user_id`, `admin_id`, `public_flag`) values 
	('lLKD0M0_Z', 'Bow River', '1649950869', '0', 'tMYWeQDP-', 'keVTJhRTV', '1');

insert into `location_profiles`(`name`, `admin_id`, `regulations`) values
	('Lake Louise', 'keVTJhRTV', 'some regulations');