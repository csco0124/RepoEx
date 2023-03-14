JPA Entity를 정의하면 JPA 설정에 따라 자동으로 테이블이 생성이 되므로 테이블 생성 쿼리를 실행할 필요가 없다.

Hibernate: create table member (user_no bigint not null auto_increment, reg_date datetime, upd_date datetime, user_id varchar(255), user_name varchar(255), user_pw varchar(255), primary key (user_no)) engine=InnoDB
Hibernate: create table member_auth (user_auth_no bigint not null auto_increment, auth varchar(255), user_no bigint, primary key (user_auth_no)) engine=InnoDB
Hibernate: alter table member_auth add constraint FKaf2tvkd2ab6k2g6y5pqha86b2 foreign key (user_no) references member (user_no)

CREATE TABLE member (
	user_no BIGINT AUTO_INCREMENT,
	user_id VARCHAR(50) NOT NULL,
	user_pw VARCHAR(100) NOT NULL,
	user_name VARCHAR(100) NOT NULL,
	reg_date DATETIME,
	upd_date DATETIME,
	PRIMARY KEY (user_no)
);
      
CREATE TABLE member_auth (
	user_auth_no BIGINT auto_increment,
	user_no BIGINT NOT NULL,
	auth VARCHAR(50) NOT NULL,
	PRIMARY KEY (user_auth_no)
);
      
ALTER TABLE member_auth ADD CONSTRAINT fk_member_auth_user_no
FOREIGN KEY (user_no) REFERENCES member(user_no);
