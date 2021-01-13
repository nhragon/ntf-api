CREATE TABLE IF NOT EXISTS `Users` (
    `ethAddress`    VARCHAR(42) NOT NULL PRIMARY KEY,
    `firstName`     VARCHAR(255) DEFAULT NULL,
    `lastName`      VARCHAR(255) DEFAULT NULL,
    `image`         VARCHAR(255) DEFAULT NULL,
    `createdAt`     DATETIME DEFAULT current_timestamp(),
    `updatedAt`     DATETIME DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
