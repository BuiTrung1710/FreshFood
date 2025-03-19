CREATE DATABASE  IF NOT EXISTS `testingsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `testingsystem`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: testingsystem
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `AccountID` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `DepartmentID` tinyint unsigned DEFAULT NULL,
  `PositionID` tinyint unsigned DEFAULT NULL,
  `CreateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(800) DEFAULT NULL,
  `status` tinyint DEFAULT '0',
  `PathImage` varchar(50) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`AccountID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Username` (`Username`),
  KEY `DepartmentID` (`DepartmentID`),
  KEY `PositionID` (`PositionID`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`DepartmentID`) REFERENCES `department` (`DepartmentID`),
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`PositionID`) REFERENCES `position` (`PositionID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (4,'buitrung2002@gmail.com','Bui Trung','Bùi Đăng Quang Trung',NULL,NULL,'2024-05-01 01:22:19','$2a$10$6A.9waPKVJb2hhChwhD32ef4.Onzww14oF.J4Fmdf0SPFcVf.ke0S',0,NULL,1),(5,'nam@gmail.com','Nam Nguyen','Nguyễn Hoàng Nam',NULL,NULL,'2024-05-02 08:09:23','$2a$10$lTCd15JfZFPjfC/TZvu4JO6psBVlfo5W38j/sLJ4fsxsP26XFNp7u',0,NULL,0),(6,'phong@gmail.com','Phong Vu','Vũ Ngọc Phong',NULL,NULL,'2024-05-02 10:00:02','$2a$10$7TWITkx/8YYE1Go5ywvYh.4DSoCJJue/nDipgzpI7gPJ0TeQu6l9i',0,NULL,0),(7,'kien@gmail.com','Kien Le','Lê Văn Kiên',NULL,NULL,'2024-05-02 10:09:41','$2a$10$jvc49MXAsIuvgKdlU1uHfuMM12do.GEIPWwQnj3zn0AlU2QZ3ULkW',0,NULL,0),(8,'minh@gmail.com','Minh Nguyen','Nguyễn Văn Minh',NULL,NULL,'2024-05-02 13:45:00','$2a$10$pq97grQgXMiYrfVR/x2.ReWq2Ql3H7mpbiPFSgazo8RPrrojhcEI2',0,NULL,0);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CategoryId` smallint unsigned NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(30) NOT NULL,
  PRIMARY KEY (`CategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Tất cả sản phẩm'),(2,'Trứng và bơ'),(3,'Thực phẩm khô'),(4,'Thịt tươi sống'),(5,'Trái cây'),(6,'Rau củ quả'),(7,'Nước ép');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `DepartmentID` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `DepartmentName` varchar(30) NOT NULL,
  PRIMARY KEY (`DepartmentID`),
  UNIQUE KEY `DepartmentName` (`DepartmentName`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (10,'Bán hàng'),(3,'Bảo vệ'),(8,'Giám đốc'),(5,'Kỹ thuật'),(1,'Marketing'),(4,'Nhân sự'),(7,'Phó giám đốc'),(2,'Sale'),(6,'Tài chính'),(9,'Thư kí');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `ManufacturerId` smallint unsigned NOT NULL AUTO_INCREMENT,
  `ManufacturerName` enum('SAMSUNG','APPLE','XIAOMI','OPPO') NOT NULL,
  PRIMARY KEY (`ManufacturerId`),
  UNIQUE KEY `ManufacturerName` (`ManufacturerName`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
INSERT INTO `manufacturer` VALUES (1,'SAMSUNG'),(2,'APPLE'),(3,'XIAOMI'),(4,'OPPO');
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_id` tinyint unsigned DEFAULT NULL,
  `product_id` smallint unsigned DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`ProductId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (2,10,1),(3,7,2),(4,10,12),(4,4,1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `customer_fullname` varchar(255) NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `customer_phone` varchar(100) NOT NULL,
  `customer_email` varchar(50) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `order_status` varchar(50) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `order_note` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `accountId` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `accountId_idx` (`accountId`),
  CONSTRAINT `accountId` FOREIGN KEY (`accountId`) REFERENCES `account` (`AccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,'Lê Văn Kiên','hanoi',NULL,'+12012018271','kien@gmail.com','paid','1','stripe',NULL,'2024-05-02 10:12:27',7),(3,'Nguyễn Văn Minh','hanoi',NULL,'+12012819281','minh@gmail.com','paid','0','stripe',NULL,'2024-05-02 13:48:26',8),(4,'Nguyễn Văn Minh','hanoi',NULL,'+12012819281','minh@gmail.com','paid','0','stripe',NULL,'2024-05-02 13:50:03',8);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `PositionID` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `PositionName` enum('Dev','Test','Scrum_Master','PM') NOT NULL,
  PRIMARY KEY (`PositionID`),
  UNIQUE KEY `PositionName` (`PositionName`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'Dev'),(2,'Test'),(3,'Scrum_Master'),(4,'PM');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ProductId` smallint unsigned NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(50) NOT NULL,
  `ProductPrice` varchar(50) NOT NULL,
  `ProductInfo` varchar(200) NOT NULL,
  `ProductDetail` varchar(500) DEFAULT NULL,
  `RatingStar` tinyint unsigned DEFAULT NULL,
  `ProductImage` varchar(50) DEFAULT NULL,
  `ManufacturerId` smallint unsigned DEFAULT NULL,
  `CategoryId` smallint unsigned DEFAULT NULL,
  `stock_quantity` smallint DEFAULT '0',
  `createDate` date DEFAULT NULL,
  `exp_date` date DEFAULT NULL,
  PRIMARY KEY (`ProductId`),
  UNIQUE KEY `ProductName` (`ProductName`),
  KEY `ManufacturerId` (`ManufacturerId`),
  KEY `CategoryId` (`CategoryId`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`ManufacturerId`) REFERENCES `manufacturer` (`ManufacturerId`),
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`CategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (4,'Cam sành Đà Lạt (1kg)','0.2','Cam tươi ngon, mọng nước, ít hạt',NULL,NULL,'/imgs/1714611894499.jpg',NULL,5,39,'2024-05-02','2024-05-16'),(5,'Bún tươi Hà Nội (1 gói 400g)','0.1','Sợi dai, ngon, không hóa chất',NULL,NULL,'/imgs/1714612041359.jpg',NULL,3,60,'2024-05-02','2024-07-02'),(6,'Mận Hà Nội (1kg)','0.5','Mận ngon, mọng nước',NULL,NULL,'/imgs/1714612110369.png',NULL,5,50,'2024-05-02','2024-05-15'),(7,'Bơ đậu phộng (1 lọ 300g)','1.0','Bơ đậu phộng thơm ngon, béo ngậy',NULL,NULL,'/imgs/1714615508794.jpg',NULL,2,38,'2024-05-02','2024-05-15'),(8,'Nước ép cam (1 lon 250ml)','0.6','Nước cam giải khát, tươi ngon.',NULL,NULL,'/imgs/1714615635435.png',NULL,7,60,'2024-05-02','2024-08-02'),(9,'Củ cải đỏ (1kg)','1.2','Củ cải tươi ngon, không chất kích thích',NULL,NULL,'/imgs/1714615756503.jpg',NULL,6,40,'2024-05-02','2024-05-23'),(10,'Trứng gà ta (1 hộp 10 quả)','1.7','Trứng ga ta, thơm ngon bổ dưỡng',NULL,NULL,'/imgs/1714615881219.jpg',NULL,2,7,'2024-05-09','2024-06-19');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_review`
--

DROP TABLE IF EXISTS `product_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_review` (
  `reviewId` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `ProductId` smallint unsigned DEFAULT NULL,
  `AccountID` tinyint unsigned DEFAULT NULL,
  `rating` smallint NOT NULL,
  `recommend` varchar(1000) NOT NULL,
  PRIMARY KEY (`reviewId`),
  KEY `ProductId` (`ProductId`),
  KEY `AccountID` (`AccountID`),
  CONSTRAINT `product_review_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`),
  CONSTRAINT `product_review_ibfk_2` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_review`
--

LOCK TABLES `product_review` WRITE;
/*!40000 ALTER TABLE `product_review` DISABLE KEYS */;
INSERT INTO `product_review` VALUES (2,5,5,5,'sản phẩm ok'),(3,6,5,4,'sản phẩm ok'),(4,4,5,5,'sản phẩm khá ổn'),(5,7,5,5,'ok'),(6,8,5,4,'ok'),(7,9,5,4,'ok'),(8,8,6,5,'sản phẩm chất lượng'),(9,10,6,5,'ok'),(10,10,7,5,'ok'),(11,7,8,5,'ok');
/*!40000 ALTER TABLE `product_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration_user_token`
--

DROP TABLE IF EXISTS `registration_user_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration_user_token` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `token` char(36) NOT NULL,
  `user_id` smallint unsigned NOT NULL,
  `expiryDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_user_token`
--

LOCK TABLES `registration_user_token` WRITE;
/*!40000 ALTER TABLE `registration_user_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration_user_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_branch`
--

DROP TABLE IF EXISTS `shipping_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_branch` (
  `branchId` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `branchName` varchar(50) NOT NULL,
  `branchAddress` varchar(255) NOT NULL,
  PRIMARY KEY (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_branch`
--

LOCK TABLES `shipping_branch` WRITE;
/*!40000 ALTER TABLE `shipping_branch` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipping_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_order`
--

DROP TABLE IF EXISTS `shipping_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_order` (
  `orderID` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `senderName` varchar(50) NOT NULL,
  `senderAddress` varchar(255) NOT NULL,
  `senderPhoneNumber` varchar(20) NOT NULL,
  `packageType` varchar(10) NOT NULL,
  `receiverName` varchar(50) NOT NULL,
  `receiverAddress` varchar(255) NOT NULL,
  `reveiverPhoneNumber` varchar(50) NOT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `shippingFee` varchar(50) DEFAULT NULL,
  `packageWeight` varchar(50) DEFAULT NULL,
  `employeeSignatureImage` varchar(50) DEFAULT NULL,
  `branchId` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `branchId` (`branchId`),
  CONSTRAINT `shipping_order_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `shipping_branch` (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_order`
--

LOCK TABLES `shipping_order` WRITE;
/*!40000 ALTER TABLE `shipping_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipping_order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-21 12:54:09
