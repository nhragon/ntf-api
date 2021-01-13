CREATE TABLE IF NOT EXISTS `Attributes` (
    `id`            INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(255) NOT NULL,
    `description`   TEXT DEFAULT NULL,
    `unit`          VARCHAR(255) DEFAULT NULL,
    `type`          ENUM('STAT', 'ATTRIBUTE'),
    `image`         VARCHAR(255) DEFAULT NULL,
    `createdAt`     DATETIME DEFAULT current_timestamp(),
    `updatedAt`     DATETIME DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    UNIQUE KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
