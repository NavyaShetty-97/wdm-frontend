-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 09, 2022 at 01:06 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wdm`
--

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `expense_id` int(12) NOT NULL,
  `expense_title` varchar(100) NOT NULL,
  `expense_desc` varchar(1000) DEFAULT NULL,
  `land_id` int(12) DEFAULT NULL,
  `owner_id` int(12) DEFAULT NULL,
  `expense_cost` float(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`expense_id`, `expense_title`, `expense_desc`, `land_id`, `owner_id`, `expense_cost`) VALUES
(1, 'First Expense', '', NULL, 30, 100.000),
(2, 'Second Expense', '', NULL, 30, 100.000);

-- --------------------------------------------------------

--
-- Table structure for table `Lands`
--

CREATE TABLE `Lands` (
  `ID` int(12) NOT NULL,
  `OwnerID` int(12) NOT NULL,
  `LandDesc` varchar(100) DEFAULT NULL,
  `Size` float(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lands`
--

INSERT INTO `Lands` (`ID`, `OwnerID`, `LandDesc`, `Size`) VALUES
(1, 15, NULL, 50000.000),
(2, 17, NULL, 45000.000),
(3, 19, NULL, 34000.000),
(4, 21, NULL, 60000.000),
(5, 23, NULL, 55000.000),
(6, 25, NULL, 52000.000),
(7, 27, NULL, 48500.000);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `phone` int(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(12) NOT NULL,
  `project_title` varchar(100) NOT NULL,
  `project_desc` varchar(1000) DEFAULT NULL,
  `land_id` int(12) DEFAULT NULL,
  `owner_id` int(12) DEFAULT NULL,
  `project_cost` float(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `project_title`, `project_desc`, `land_id`, `owner_id`, `project_cost`) VALUES
(4, 'First Project', 'First Project', NULL, 30, 1000.000),
(5, 'Second Project', 'Second Project', NULL, 30, 800.000);

-- --------------------------------------------------------

--
-- Table structure for table `trials`
--

CREATE TABLE `trials` (
  `trial_id` int(12) NOT NULL,
  `trial_title` varchar(100) NOT NULL,
  `trial_desc` varchar(1000) DEFAULT NULL,
  `land_id` int(12) DEFAULT NULL,
  `owner_id` int(12) DEFAULT NULL,
  `trial_cost` float(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trials`
--

INSERT INTO `trials` (`trial_id`, `trial_title`, `trial_desc`, `land_id`, `owner_id`, `trial_cost`) VALUES
(1, 'First Trial', 'First Trial', NULL, 30, 5000.000),
(3, 'Second Trial', '', NULL, 30, 1000.000);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `ID` int(12) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `UserPw` varchar(100) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Level` int(2) NOT NULL,
  `ParentID` int(12) DEFAULT NULL,
  `IsVerified` tinyint(1) DEFAULT NULL,
  `IsAdmin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`ID`, `UserName`, `UserPw`, `FirstName`, `LastName`, `Level`, `ParentID`, `IsVerified`, `IsAdmin`) VALUES
(15, 'melchor@mail.com', 'test@123', 'Melchor', 'Diaz', 1, NULL, NULL, NULL),
(16, 'goyo@mail.com', 'test@123', 'Goyo', 'Diaz', 1, NULL, NULL, NULL),
(17, 'chico@mail.com', 'test@123', 'Chico', 'Diaz', 1, NULL, NULL, NULL),
(18, 'marcelina@mail.com', 'test@123', 'Marcelina', 'Diaz', 1, NULL, NULL, NULL),
(19, 'mencha@mail.com', 'test@234', 'Mencha', 'Diaz', 1, NULL, NULL, NULL),
(20, 'raimunda@mail.com', 'test@234', 'Raimunda', 'Diaz', 1, NULL, NULL, NULL),
(21, 'arcadio@mail.com', 'test@234', 'Arcadio', 'Diaz', 1, NULL, NULL, NULL),
(22, 'agapito@mail.com', 'test@234', 'Agapito', 'Diaz', 1, NULL, NULL, NULL),
(23, 'pedro@mail.com', 'test@234', 'Pedro', 'Diaz', 1, NULL, NULL, NULL),
(24, 'eulalia@mail.com', 'test@234', 'Eulalia', 'Diaz', 1, NULL, NULL, NULL),
(25, 'cleto@mail.com', 'test@234', 'Cleto', 'Diaz', 1, NULL, NULL, NULL),
(26, 'evarista@mail.com', 'test@345', 'Evarista', 'Diaz', 1, NULL, NULL, NULL),
(27, 'juana@mail.com', 'test@345', 'Juana', 'Diaz', 1, NULL, NULL, NULL),
(28, 'justina@mail.com', 'test@345', 'Justina', 'Diaz', 1, NULL, NULL, NULL),
(30, 'madhur@mail.com', 'test@123', 'Madhur', 'Kulkarni', 2, 15, 0, NULL),
(31, 'rohan@mail.com', 'test@123', 'Rohan', 'Shetty', 2, 15, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`expense_id`);

--
-- Indexes for table `Lands`
--
ALTER TABLE `Lands`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `trials`
--
ALTER TABLE `trials`
  ADD PRIMARY KEY (`trial_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UserName` (`UserName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `expense_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Lands`
--
ALTER TABLE `Lands`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `trials`
--
ALTER TABLE `trials`
  MODIFY `trial_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
