SET NAMES utf8mb4;
START TRANSACTION;

CREATE TABLE changelog (
  id INT UNSIGNED NOT NULL PRIMARY KEY,
  timestamp INT UNSIGNED
);

INSERT INTO changelog VALUES (1, UNIX_TIMESTAMP());

COMMIT;