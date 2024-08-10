CREATE TABLE users (
  id varchar(20) NOT NULL,
	email varchar(256) NOT NULL,
  username varchar(256) NOT NULL,
  password varchar(256) NOT NULL,
      
  account_non_expired tinyint(1) DEFAULT NULL,
  account_non_locked tinyint(1) DEFAULT NULL,
  credentials_non_expired tinyint(1) DEFAULT NULL,
  enabled tinyint(1) DEFAULT NULL,
  PRIMARY KEY (id)
);



CREATE TABLE authorities (
  id varchar(20) NOT NULL,	
	authority_code varchar(20) NOT NULL,
	PRIMARY KEY (id)
);