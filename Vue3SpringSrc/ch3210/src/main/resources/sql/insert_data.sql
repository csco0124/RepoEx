INSERT INTO users (username, password) VALUES ('alex','1234');
INSERT INTO users (username, password) VALUES ('jade','1234');
INSERT INTO users (username, password) VALUES ('admin','1234');

INSERT INTO authorities (username, authority) VALUES ('alex','ROLE_MEMBER');
INSERT INTO authorities (username, authority) VALUES ('jade','ROLE_MEMBER');
INSERT INTO authorities (username, authority) VALUES ('jade','ROLE_ADMIN');
INSERT INTO authorities (username, authority) VALUES ('admin','ROLE_ADMIN');
