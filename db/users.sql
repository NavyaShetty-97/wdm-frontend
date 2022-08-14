
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

CREATE TABLE Users(
    ID int (12) AUTO_INCREMENT,
    UserName VARCHAR (50) UNIQUE NOT NULL,
    UserPw VARCHAR (100) NOT NULL,
    FirstName VARCHAR (100) NOT NULL,
    LastName VARCHAR (100) NOT NULL,
    Level int(2) not null,
    ParentID int(12),
    IsVerified boolean,
    IsAdmin boolean,
CONSTRAINT PK_USER PRIMARY KEY (ID));