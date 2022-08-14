
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

CREATE TABLE sellland(
    sellland_id int (12) AUTO_INCREMENT,
    land_id int (12) NOT NULL,
    sellto varchar (12) NOT NULL,
    sales_desc varchar(100),
    land_size int (12) NOT NULL,
    price int (12) NOT NULL,
    PRIMARY KEY (sellland_id));