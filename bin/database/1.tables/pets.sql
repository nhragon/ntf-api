CREATE TABLE IF NOT EXISTS `Pets` (
    `id`                BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`              VARCHAR(255) NOT NULL,
    `description`       TEXT DEFAULT NULL,
    `genes`             VARCHAR(255) DEFAULT NULL,
    `level`             TINYINT DEFAULT 1,
    `classID`           INT DEFAULT 0, -- table:Classes.id
    `bodyShapeID`       INT DEFAULT 0, -- table:BodyShapes.id
    `birthDay`          DATETIME DEFAULT current_timestamp(),
    `breedCount`        TINYINT DEFAULT 0,
    `image`             VARCHAR(255) DEFAULT NULL,
    `parentID`          BIGINT DEFAULT NULL, -- table:Pets.id
    `ownerAddress`      VARCHAR(42) DEFAULT NULL,
    `createdAt`         DATETIME DEFAULT current_timestamp(),
    `updatedAt`         DATETIME DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
