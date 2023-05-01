-- hms_mem table
CREATE TABLE hms_mem (
  member_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  pwd VARCHAR(100) NOT NULL,
  name VARCHAR(4) NOT NULL,
  tel VARCHAR(14),
  nick VARCHAR(5),
  intro LONGTEXT,
  hob TEXT,
  created_date DATETIME DEFAULT NOW(),
  inter VARCHAR(50),
  PRIMARY KEY (member_id),
  UNIQUE KEY (email)
);

-- hms_gall table
CREATE TABLE hms_gall (
  board_id INT NOT NULL AUTO_INCREMENT,
  writer INT,
  title VARCHAR(15) NOT NULL,
  content TEXT NOT NULL,
  pwd VARCHAR(10),
  comment INT,
  created_date DATETIME DEFAULT NOW(),
  view_cnt INT DEFAULT 0,
  PRIMARY KEY (board_id),
  FOREIGN KEY (writer) REFERENCES hms_mem(member_id) ON DELETE CASCADE,
  FOREIGN KEY (comment) REFERENCES hms_comm(comment_id) ON DELETE CASCADE
);

-- hms_gall_file table
CREATE TABLE hms_gall_file (
  boardfile_id INT NOT NULL AUTO_INCREMENT,
  filepath VARCHAR(255) NOT NULL,
  origin_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(30) NOT NULL,
  board_id INT NOT NULL,
  writer INT,
  PRIMARY KEY (boardfile_id),
  FOREIGN KEY (board_id) REFERENCES hms_gall(board_id) ON DELETE CASCADE,
  FOREIGN KEY (writer) REFERENCES hms_mem(member_id) ON DELETE CASCADE
);

-- hms_comm table
CREATE TABLE hms_comm (
  comment_id INT NOT NULL AUTO_INCREMENT,
  content VARCHAR(30),
  board_id INT,
  writer INT,
  created_date DATETIME DEFAULT NOW(),
  PRIMARY KEY (comment_id),
  FOREIGN KEY (writer) REFERENCES hms_mem(member_id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES hms_gall(board_id) ON DELETE CASCADE
);

-- hms_like table
CREATE TABLE hms_like (
  like_id INT AUTO_INCREMENT PRIMARY KEY,
  board_id INT NOT NULL,
  member_id INT NOT NULL,
  FOREIGN KEY (board_id) REFERENCES hms_gall(board_id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES hms_mem(member_id) ON DELETE CASCADE
);

-- hms_mem_file table
CREATE TABLE hms_mem_file (
  memberfile_id INT NOT NULL AUTO_INCREMENT,
  filepath VARCHAR(255) NOT NULL,
  origin_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(30) NOT NULL,
  member_id INT NOT NULL,
  board_id INT,
  PRIMARY KEY (memberfile_id),
  FOREIGN KEY (member_id) REFERENCES hms_mem(member_id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES hms_gall(board_id) ON DELETE CASCADE
);

-- hms_follow table
CREATE TABLE hms_follow (
  follow_id INT(11) NOT NULL AUTO_INCREMENT,
  follower_id INT(11) NOT NULL,
  followed_id INT(11) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follow_id),
  FOREIGN KEY (follower_id) REFERENCES hms_mem(member_id) ON DELETE CASCADE,
  FOREIGN KEY (followed_id) REFERENCES hms_mem(member_id) ON DELETE CASCADE,
  UNIQUE (follower_id, followed_id)
);

-- hms_qna table
CREATE TABLE hms_qna (
  qna_id INT NOT NULL AUTO_INCREMENT,
  writer INT,
  title VARCHAR(15),
  content VARCHAR(100),
  created_date DATETIME DEFAULT NOW(),
  view_count INT,
  PRIMARY KEY (qna_id),
  FOREIGN KEY (writer) REFERENCES hms_mem(member_id) ON DELETE CASCADE
);
  

  CREATE TABLE hms_qnacomm (
  qnacomment_id INT NOT NULL AUTO_INCREMENT,
  content VARCHAR(30),
  writer INT,
  qna_id INT,
  created_date DATETIME DEFAULT NOW(),
  PRIMARY KEY (qnacomment_id),
  FOREIGN KEY (writer) REFERENCES hms_mem(member_id),
  FOREIGN KEY (qna_id) REFERENCES hms_qna(qna_id)
);

CREATE TABLE hms_payment (
  payment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  imp_uid VARCHAR(50),
  buyer_email VARCHAR(50),
  buyer_name VARCHAR(50),
  paid_amount VARCHAR(20),
  buyer_date VARCHAR(15),
  buyer_time VARCHAR(15),
  adult INT,
  teen INT,
  sumticket INT,
  created_date DATETIME DEFAULT NOW(),
  seats INT
);

--CREATE TABLE hms_time_slots (
--  time_slot_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--  time_slot VARCHAR(15) NOT NULL,
--  booked_seats INT DEFAULT 0
--);



-- hms_gall table
ALTER TABLE hms_gall
  DROP FOREIGN KEY hms_gall_fk;

ALTER TABLE hms_gall
  ADD CONSTRAINT hms_gall_fk FOREIGN KEY (writer) REFERENCES hms_mem(member_id) ON DELETE CASCADE;

-- hms_gall_file table
ALTER TABLE hms_gall_file
  DROP FOREIGN KEY hms_gall_file_fk;

ALTER TABLE hms_gall_file
  ADD CONSTRAINT hms_gall_file_fk FOREIGN KEY (board_id) REFERENCES hms_gall(board_id) ON DELETE CASCADE;

-- hms_comm table
ALTER TABLE hms_comm
  DROP FOREIGN KEY hms_comm_fk_writer;

ALTER TABLE hms_comm
  ADD CONSTRAINT hms_comm_fk_writer FOREIGN KEY (writer) REFERENCES hms_mem(member_id) ON DELETE CASCADE;

ALTER TABLE hms_comm
  DROP FOREIGN KEY hms_comm_fk_board_id;

ALTER TABLE hms_comm
  ADD CONSTRAINT hms_comm_fk_board_id FOREIGN KEY (board_id) REFERENCES hms_gall(board_id) ON DELETE CASCADE;

-- hms_like table
ALTER TABLE hms_like
  DROP FOREIGN KEY hms_like_ibfk_1;

ALTER TABLE hms_like
  ADD CONSTRAINT hms_like_ibfk_1 FOREIGN KEY (board_id) REFERENCES hms_gall(board_id) ON DELETE CASCADE;

ALTER TABLE hms_like
  DROP FOREIGN KEY hms_like_ibfk_2;

ALTER TABLE hms_like
  ADD CONSTRAINT hms_like_ibfk_2 FOREIGN KEY (member_id) REFERENCES hms_mem(member_id) ON DELETE CASCADE;

-- hms_follow table
ALTER TABLE hms_follow
  DROP FOREIGN KEY hms_follow_ibfk_1;

ALTER TABLE hms_follow
  ADD CONSTRAINT hms_follow_ibfk_1 FOREIGN KEY (follower_id) REFERENCES hms_mem(member_id) ON DELETE CASCADE;

ALTER TABLE hms_follow
  DROP FOREIGN KEY hms_follow_ibfk_2;

ALTER TABLE hms_follow
  ADD CONSTRAINT hms_follow_ibfk_2 FOREIGN KEY (followed_id) REFERENCES hms_mem(member_id) ON DELETE CASCADE;

-- hms_qna table
ALTER TABLE hms_qna
  DROP FOREIGN KEY hms_qna_fk;

ALTER TABLE hms_qna
  ADD CONSTRAINT hms_qna_fk FOREIGN KEY (writer) REFERENCES hms_mem(member_id) ON DELETE CASCADE;


ALTER TABLE hms_qnacomm
DROP FOREIGN KEY `fk_hms_qnacomm_writer`;

ALTER TABLE hms_qnacomm
ADD CONSTRAINT `fk_hms_qnacomm_writer`
FOREIGN KEY (writer) REFERENCES hms_mem(member_id) ON DELETE CASCADE;

ALTER TABLE hms_qnacomm
DROP FOREIGN KEY `fk_hms_qnacomm_qna_id`;

ALTER TABLE hms_qnacomm
ADD CONSTRAINT `fk_hms_qnacomm_qna_id`
FOREIGN KEY (qna_id) REFERENCES hms_qna(qna_id) ON DELETE CASCADE;

