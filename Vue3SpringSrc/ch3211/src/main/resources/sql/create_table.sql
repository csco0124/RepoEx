CREATE TABLE member (
	user_no BIGINT AUTO_INCREMENT,
	user_id VARCHAR(50) NOT NULL,
	user_pw VARCHAR(100) NOT NULL,
	user_name VARCHAR(100) NOT NULL,
	coin INTEGER DEFAULT 0,
	enabled CHAR(1) DEFAULT '1',
	reg_date DATETIME,
	upd_date DATETIME,
	PRIMARY KEY (user_no)
);
      
CREATE TABLE member_auth (
	user_no BIGINT NOT NULL,
	auth VARCHAR(50) NOT NULL
);
      
ALTER TABLE member_auth ADD CONSTRAINT fk_member_auth_user_no
FOREIGN KEY (user_no) REFERENCES member(user_no);
