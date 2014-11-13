CREATE DATABASE ev_movie_test;
USE ev_movie_test;
CREATE TABLE MOVIE(id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(50));
CREATE TABLE score_info(movie_id INT, score INT, CONSTRAINT movie_id_movie_fk FOREIGN KEY(movie_id) REFERENCES movie(id));

# INSERT INTO score_info VALUES(2,3);
# ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`ev_movie_test`.`score_info`, CONSTRAINT `movie_id_movie_fk` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`))

INSERT INTO movie VALUES (1,"인터스텔라"),(2,"패션왕"),(3,"보이후드");

# test score
# INSERT INTO score_info VALUES (2,3);
