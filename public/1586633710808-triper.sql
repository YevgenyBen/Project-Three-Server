-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2020 at 03:29 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `triper`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_name`, `password`, `role`) VALUES
(1, 'Bob', 'Lazar', 'Admin', 'Admin', 2),
(2, 'bob', 'smith', 'bobo', 'Serpico1', 1),
(3, 'a', 'a', 'a', 'a', 1),
(4, 'b', 'b', 'b', 'b', 1),
(5, 'c', 'c', 'c', 'c', 1),
(6, 'd', 'd', 'd', 'd', 1),
(7, 'e', 'e', 'e', 'e', 1),
(8, 'e', 'e', 'e', 'e', 1),
(9, 'e', 'e', 'e', 'e', 1),
(10, 'f', 'f', 'f', 'f', 1),
(11, 'darth mcawesome', 'a', 'darth mcawesome', 'a', 1),
(12, 'r', 'r', 'r', 'r', 1),
(13, 'alina', 'be', 'alina', 'Alina', 1),
(14, 'bob', 'obb', 'dad', 'daddy', 1),
(15, '1', '1', '1', '1', 1),
(16, '2', '2', '2', '2', 1),
(17, '3', '3', '3', '3', 1),
(18, '4', '4', '4', '4', 1),
(19, '7', '7', '7', '7', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_vacation`
--

CREATE TABLE `user_vacation` (
  `id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `v_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_vacation`
--

INSERT INTO `user_vacation` (`id`, `u_id`, `v_id`) VALUES
(80, 13, 6),
(82, 13, 4),
(83, 13, 5),
(84, 13, 8),
(85, 3, 5),
(99, 5, 5),
(100, 5, 8),
(104, 4, 5),
(105, 4, 6),
(106, 4, 7),
(113, 11, 4),
(114, 11, 5),
(115, 11, 6),
(116, 11, 7),
(117, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `destination` varchar(100) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `price` float NOT NULL,
  `picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `description`, `destination`, `from_date`, `to_date`, `price`, `picture`) VALUES
(4, '(Hawaiian: Hawaiʻi, sometimes pronounced ha-VAI-ee by locals) is the 50th state of the United States of America.', 'Hawaiʻi', '2020-10-10', '2020-11-11', 1500.15, 'vac1'),
(5, 'Bucharest (Romanian: Bucureşti) is Romania\'s capital and largest city, as well as the most important industrial and commercial center of the country. With 2 million inhabitants in the city proper and more than 2.4 million in the urban area, Bucharest is one of the largest cities in Southeastern Europe, the largest city between Berlin and Istanbul.', 'Bucharest ', '2020-10-10', '2020-11-11', 1500.15, 'vac2'),
(6, 'Prague (Czech: Praha) is the capital city and largest city in the Czech Republic. It is one of the largest cities of Central Europe and has served as the capital of the historic region of Bohemia for centuries. The city is famous for its unique medieval architecture, the historical centre of Prague is inscribed in the World Heritage List.', 'Prague', '2020-10-10', '2020-11-11', 1500.15, 'vac1'),
(7, 'Porto is Portugal\'s second largest city and the capital of the Northern region.', 'Porto', '2020-10-10', '2020-11-11', 1500.15, 'vac2'),
(8, 'London is an enormous city. It is divided into thirty-two boroughs, although information on this page is divided between districts, inner boroughs and outer boroughs of the city. These district and borough articles contain sightseeing, restaurant, nightlife and accommodation listings — consider printing them all.', 'London', '2020-10-10', '2020-11-11', 2500, 'vac1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_vacation`
--
ALTER TABLE `user_vacation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_vacation`
--
ALTER TABLE `user_vacation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
