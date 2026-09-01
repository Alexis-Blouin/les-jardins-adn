-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: les_jardins_adn_db
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `accountId` int NOT NULL AUTO_INCREMENT,
  `accountEmail` varchar(255) NOT NULL,
  `accountPassword` varchar(255) NOT NULL,
  `accountIsAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`accountId`),
  UNIQUE KEY `accountEmail` (`accountEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'blouin.alexis@icloud.com','$2b$10$hulnx6yWKy1vqclaSMMHz.vtU6sE3Jg1GoaGHYEcJ0KnSfQDjE4lq',1),(2,'blouin.alexiss@icloud.com','$2b$10$eCEIIHLcLKAiWHCKG5fYFeTMfA//M0A71WbnNkUO1xSkB4n.yFJqi',0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `productDescription` varchar(255) NOT NULL,
  `productImageURL` varchar(255) NOT NULL,
  `productImagePublicId` varchar(255) NOT NULL,
  `productIsAvailable` tinyint(1) NOT NULL,
  `productPrice` decimal(6,2) NOT NULL,
  `productPriceUnit` varchar(50) NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Fleurs d\'ail','Fleurs d\'ail disponibles!','https://res.cloudinary.com/fkfdknwz/image/upload/v1785683745/poulailler_xgi9ug.jpg','products/poulailler_xgi9ug',1,5.50,'douzain'),(2,'Poulailler portatif','Poulailler portatif installé pour nos poulets de grain élevés en liberté à la ferme Les Jardin ADN. Manger vrai, manger frais!','https://res.cloudinary.com/fkfdknwz/image/upload/v1785683734/fleurs_ail_u5lyz5.jpg','products/fleurs_ail_u5lyz5',1,7.30,'unité'),(4,'Magpie2','Magpie2','https://res.cloudinary.com/fkfdknwz/image/upload/v1785880770/products/uxkj6kysaha73nzhocd7.png','products/uxkj6kysaha73nzhocd7',1,0.00,'unité'),(7,'CS','Funny','https://res.cloudinary.com/fkfdknwz/image/upload/v1786291068/products/dyfoaeb1iigyqzjpiz1n.png','products/dyfoaeb1iigyqzjpiz1n',1,0.00,'unité'),(8,'Ahhh','Ouhhhh','https://res.cloudinary.com/fkfdknwz/image/upload/v1786330674/products/gjnxqguw7u9t2cdgbc6b.png','products/gjnxqguw7u9t2cdgbc6b',1,0.00,'unité'),(10,'Tst imag','Ajout d\'une image random','https://res.cloudinary.com/fkfdknwz/image/upload/v1786330624/products/hf462hsuiusvkmfxdyll.png','products/hf462hsuiusvkmfxdyll',1,0.00,'unité'),(11,'étest','dsandnjas','https://res.cloudinary.com/fkfdknwz/image/upload/v1787346528/products/gjr2ep311tnpuwa42lds.png','products/gjr2ep311tnpuwa42lds',1,0.00,'unité'),(12,'My egg','Caca de poule','https://res.cloudinary.com/fkfdknwz/image/upload/v1787445505/products/hxk9t8clqzskutfgvwm8.png','products/hxk9t8clqzskutfgvwm8',1,3.99,'2'),(13,'pipi','caca','https://res.cloudinary.com/fkfdknwz/image/upload/v1787445543/products/dux6wmig1mc1h1etzc4x.png','products/dux6wmig1mc1h1etzc4x',1,2.00,'caca'),(14,'Jo','de','https://res.cloudinary.com/fkfdknwz/image/upload/v1787445679/products/wvi0s6meocjs4jzim471.png','products/wvi0s6meocjs4jzim471',0,2.00,'de');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `reservationId` int NOT NULL AUTO_INCREMENT,
  `accountId` int NOT NULL,
  `productId` int NOT NULL,
  `reservationQuantity` decimal(5,1) NOT NULL,
  `reservationPickupTime` datetime NOT NULL,
  PRIMARY KEY (`reservationId`),
  KEY `fk_accountId` (`accountId`),
  KEY `fk_productId` (`productId`),
  CONSTRAINT `fk_accountId` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `fk_productId` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,2,2,1.0,'2026-08-27 03:00:00'),(2,2,11,12.0,'2026-08-27 03:00:00');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-30 23:04:57
