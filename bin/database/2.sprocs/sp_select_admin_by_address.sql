DROP PROCEDURE IF EXISTS `sp_select_admin_by_address`;
DELIMITER $$
CREATE PROCEDURE `sp_select_admin_by_address` (
    pi_eth_address VARCHAR(42)
)
BEGIN
    SELECT  id,
            username,
            firstName,
            lastName,
            emailAddress,
            ethAddress,
            role,
            isDisabled
    FROM	Admins AD
    WHERE   AD.ethAddress = pi_eth_address;
END$$

DELIMITER ;
