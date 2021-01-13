CREATE TABLE IF NOT EXISTS `PetAttributes` (
    `petID`             BIGINT NOT NULL,
    `attributeID`       INT NOT NULL,
    `value`             VARCHAR(255) NOT NULL,
    `createdAt`         DATETIME DEFAULT current_timestamp(),
    `updatedAt`         DATETIME DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (petID, attributeID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
