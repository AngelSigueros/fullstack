INSERT INTO `author` (`id`, `name`) VALUES ('1', 'Autor 1');
INSERT INTO `author` (`id`, `name`) VALUES ('2', 'Autor 2');
INSERT INTO `author` (`id`, `name`) VALUES ('3', 'Autor 3');
INSERT INTO `author` (`id`, `name`) VALUES ('4', 'Autor 4');
--
INSERT INTO `fullstack_db`.`editorial` (`year`, `id`, `descripcion`, `name`, photo_url) VALUES ('1954', '1', 'Edtorial 1 con solera', 'Editorial 1', 'https://picsum.photos/id/944/900/500');
INSERT INTO `fullstack_db`.`editorial` (`year`, `id`, `descripcion`, `name`, photo_url) VALUES ('1964', '2', 'Edtorial 2 con solera', 'Editorial 2', 'https://picsum.photos/id/944/900/500');
INSERT INTO `fullstack_db`.`editorial` (`year`, `id`, `descripcion`, `name`, photo_url) VALUES ('1974', '3', 'Edtorial 3 con solera', 'Editorial 3', 'https://picsum.photos/id/944/900/500');
INSERT INTO `fullstack_db`.`editorial` (`year`, `id`, `descripcion`, `name`, photo_url) VALUES ('1984', '4', 'Edtorial 4 con solera', 'Editorial 4', 'https://picsum.photos/id/944/900/500');
--
INSERT INTO book (id, title, isbn, price, publish_date, author_id, editorial_id, available) VALUES
(1, 'To Kill a Mockingbird', '9780446310789', 7.19, '1960-02-16', 1, 1, false),
(2, '1984', '9780451524935', 9.99, '1949-02-16', 1, 2, false),
(3, 'The Great Gatsby', '9780743273565', 14.99, '1925-02-16', 2, 4, false),
(4, 'Moby Dick', '9781503280786', 11.50, '1851-02-16', 2, 4, true),
(5, 'War and Peace', '9781400079988', 18.00, '1869-02-16', 3, 2, false),
(6, 'Pride and Prejudice', '9781503290563', 6.99, '1813-02-16', 3, 2, true),
(7, 'The Catcher in the Rye', '9780316769488', 8.99, '1951-02-16', 3, 2, true),
(8, 'The Hobbit', '9780547928227', 13.95, '1937-02-16', 4, 3, true),
(9, 'Fahrenheit 451', '9781451673319', 12.99, '1953-02-16', 4, 3, false),
(10, 'A Tale of Two Cities', '9781503219708', 9.99, '1859-02-16', 1, 2, true);
--