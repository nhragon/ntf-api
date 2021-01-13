CREATE TABLE IF NOT EXISTS `Admins` (
    `id`                BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username`          VARCHAR(100) DEFAULT NULL,
    `password`          VARCHAR(100) DEFAULT NULL,
    `firstName`         VARCHAR(50) DEFAULT NULL,
    `lastName`          VARCHAR(50) DEFAULT NULL,
    `emailAddress`      VARCHAR(100) DEFAULT NULL,
    `ethAddress`        VARCHAR(42) DEFAULT NULL,
    `role`              VARCHAR(20) DEFAULT NULL,
    `accessToken`       TEXT DEFAULT NULL,
    `refreshToken`      TEXT DEFAULT NULL,
    `isDisabled`        BOOL DEFAULT 0,
    `createdAt`         DATETIME DEFAULT current_timestamp(),
    `updatedAt`         DATETIME DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    UNIQUE KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
