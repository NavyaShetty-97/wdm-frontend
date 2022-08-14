
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

CREATE TABLE Lands(
    ID int (12) AUTO_INCREMENT,
    OwnerID int (12) NOT NULL,
    LandDesc varchar(100),
    Size float (10,3) NOT NULL,
CONSTRAINT PK_USER PRIMARY KEY (ID));