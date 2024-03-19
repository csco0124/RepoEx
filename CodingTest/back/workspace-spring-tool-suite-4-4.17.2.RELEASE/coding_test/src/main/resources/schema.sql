create table member
(
   id integer(4) not null,
   name varchar(100) not null,
   age integer(3),
   addr varchar(255),
   phone_number varchar(13),
   use_yn varchar(1),
   primary key(id)
);