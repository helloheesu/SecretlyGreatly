drop table if exists user;
create table user (
	idx int primary key auto_increment,
	id varchar(255) unique,
	pw varchar(255)
);

insert into user (id, pw) values ('abcd', '1234');
insert into user (id, pw) values ('awdsphov', 'q32tr');
insert into user (id, pw) values ('wef', 'efqw');
insert into user (id, pw) values ('ewf', 'qwfe');
insert into user (id, pw) values ('asfd', '1234');
insert into user (id, pw) values ('adv', 'eqrg');
insert into user (id, pw) values ('wreg', '1234');
insert into user (id, pw) values ('vcbad', 'qerg');
insert into user (id, pw) values ('qwef', '1234');
