CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `productDescription` varchar(255) NOT NULL,
  `productImageURL` varchar(255) NOT NULL,
  `productImagePublicId` varchar(255) NOT NULL,
  PRIMARY KEY (`productId`)
)

CREATE TABLE `accounts` (
    `accountId` int NOT NULL AUTO_INCREMENT,
    `accountEmail` varchar(255) NOT NULL,
    `accountPassword` varchar(255) NOT NULL,
    PRIMARY KEY (`accountId`),
    UNIQUE KEY `accountEmail` (`accountEmail`)
)