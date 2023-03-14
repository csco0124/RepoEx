-- id : alex, password : 1234
INSERT INTO member (user_id, user_pw, user_name, reg_date) VALUES ('alex','$2a$10$P2NAIK2DW/3nBVPhxVzwgOafS8tnTwt63.DgeGrUS76W3WBSZtijS','알렉스', now());
-- id : jade, password : 1234
INSERT INTO member (user_id, user_pw, user_name, reg_date) VALUES ('jade','$2a$10$7GkUIS.QUM54BpLJpy/rGOTYrBM2Y97neEi/RC43NUsFwl3qRZava','제이드', now());
-- id : admin, password : 1234
INSERT INTO member (user_id, user_pw, user_name, reg_date) VALUES ('admin','$2a$10$0j2tg4AfVarZqvnW3JrqnOh3Oe.TtQIRMirOZ9mjnlk2TJg2WkLpO','관리자', now());

INSERT INTO member_auth (user_no, auth) VALUES ((SELECT user_no FROM member WHERE user_id = 'alex'),'ROLE_MEMBER');
INSERT INTO member_auth (user_no, auth) VALUES ((SELECT user_no FROM member WHERE user_id = 'jade'),'ROLE_MEMBER');
INSERT INTO member_auth (user_no, auth) VALUES ((SELECT user_no FROM member WHERE user_id = 'admin'),'ROLE_ADMIN');
