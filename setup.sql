CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `productDescription` varchar(255) DEFAULT NULL,
  `productImageURL` varchar(255) NOT NULL,
  PRIMARY KEY (`productId`)
)