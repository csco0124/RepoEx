CREATE TABLE member (
	user_no INTEGER(5) AUTO_INCREMENT,
	user_id VARCHAR(50) NOT NULL,
	user_pw VARCHAR(100) NOT NULL,
	user_name VARCHAR(100) NOT NULL,
	coin INTEGER(10) DEFAULT 0,
	reg_date TIMESTAMP DEFAULT now(), 
	upd_date TIMESTAMP DEFAULT now(),
	enabled CHAR(1) DEFAULT '1',
	PRIMARY KEY (user_no)
);
      
CREATE TABLE member_auth (
	user_no INTEGER(5) NOT NULL,
	auth VARCHAR(50) NOT NULL
);
      
ALTER TABLE member_auth ADD CONSTRAINT fk_member_auth_user_no
FOREIGN KEY (user_no) REFERENCES member(user_no);

INSERT INTO member (user_id, user_pw, user_name) VALUES ('member0','$2a$10$ohA1zfwg.el0qEbcUisAtOwfEM/Q0XikaQqzLF4RLvvlQBHjNhkUG','회원0');
INSERT INTO member (user_id, user_pw, user_name) VALUES ('member1','$2a$10$0YeNJZi0ZpHNJ962vF4KbOPbiiAW/FWaIOu8PTypWyzKnqmHDXEbe','회원1');
INSERT INTO member (user_id, user_pw, user_name) VALUES ('member2','$2a$10$q8SAiCddta4vsxze3klZKOWWLoo1qwgwTQ7MdBcN3ZV8oL435vszm','회원2');
INSERT INTO member (user_id, user_pw, user_name) VALUES ('admin3','$2a$10$tu7hm6.6uYkcvMi//ol9A.gLeyGFwezZmtlSnvgUeBhgZ1UaSN1CG','관리자3');
INSERT INTO member (user_id, user_pw, user_name) VALUES ('admin4','$2a$10$SAipGDDRGkCStRyrao.pPeseuMoeBFiifUH0RAFDyyb.p/WG59zuS','관리자4');

INSERT INTO member_auth (user_no, auth) VALUES ((SELECT user_no FROM member WHERE user_id = 'member0'),'ROLE_MEMBER');
INSERT INTO member_auth (user_no, auth) VALUES ((SELECT user_no FROM member WHERE user_id = 'member1'),'ROLE_MEMBER');
INSERT INTO member_auth (user_no, auth) VALUES ((SELECT user_no FROM member WHERE user_id = 'member2'),'ROLE_MEMBER');
INSERT INTO member_auth (user_no, auth) VALUES ((SELECT user_no FROM member WHERE user_id = 'admin3'),'ROLE_ADMIN');
INSERT INTO member_auth (user_no, auth) VALUES ((SELECT user_no FROM member WHERE user_id = 'admin4'),'ROLE_ADMIN');
