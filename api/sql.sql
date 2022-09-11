CREATE TABLE `licenses` (
	`license` VARCHAR(18) NOT NULL COLLATE 'utf8mb4_general_ci',
	`expire` VARCHAR(10) NOT NULL DEFAULT '0000-00-00' COLLATE 'utf8mb4_general_ci'
)
