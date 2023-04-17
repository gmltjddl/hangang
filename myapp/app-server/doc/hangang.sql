drop table if exists hms_mem restrict;

create table hms_mem(
  member_id int not null,
  email varchar(50) not null,
  pwd varchar(20) not null,
  name varchar(50) not null,
  tel varchar(20),
   nick varchar(15),
  intro LONGTEXT,
  hob TEXT,
  created_date datetime default now()
);

alter table hms_mem
  add constraint primary key (member_id),
  modify column member_id int not null auto_increment;

alter table hms_mem
  add constraint app_member_uk unique (email);
  
alter table hms_mem
  modify column pwd varchar(100) not null;

  
  insert into hms_mem(member_id, email, pwd,name)
values (1,  'root@root', sha2('1111',256),'root');
  

create table app_board (
  board_id int not null,
  title varchar(255) not null,
  content text not null,
  pwd varchar(10),
  created_date datetime default now(),
  view_cnt int default 0
);

alter table app_board
  add constraint primary key (board_id),
  modify column board_id int not null auto_increment;

alter table app_board
  add column writer int,
  add constraint app_board_fk foreign key (writer) references app_member(member_id);




create table hms_comm(
  comment_id int ,
  content varchar(30),
  created_date datetime default now()
);

alter table hms_comm
  add constraint primary key (comment_id),
  modify column comment_id int not null auto_increment;


alter table hms_comm
  add column writer int,
  add constraint hms_comm_fk_writer foreign key (writer) references hms_mem(member_id);
  
alter table hms_comm
  add column board_id int,
  add constraint hms_comm_fk_board_id foreign key (board_id) references hms_gall(board_id);

  

alter table hms_gall_file
  add column writer int,
  add constraint hms_gall_file_fk foreign key (writer) references hms_mem(member_id);



  