CREATE TABLE users (
	username VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	enabled CHAR(1) DEFAULT '1',
	PRIMARY KEY (username)
);

CREATE TABLE authorities (
	username VARCHAR(50) NOT NULL,
	authority VARCHAR(50) NOT NULL
);

ALTER TABLE authorities ADD CONSTRAINT fk_authorities_users
FOREIGN KEY (username) REFERENCES users(username);

CREATE UNIQUE INDEX ix_auth_username ON authorities (username,authority);
