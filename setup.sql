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
)

CREATE TABLE `accounts` (
  `accountId` int NOT NULL AUTO_INCREMENT,
  `accountEmail` varchar(255) NOT NULL,
  `accountPassword` varchar(255) NOT NULL,
  `accountIsAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`accountId`),
  UNIQUE KEY `accountEmail` (`accountEmail`)
)

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
)