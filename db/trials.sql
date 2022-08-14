
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

CREATE TABLE trials(
    trial_id int (12) AUTO_INCREMENT,
    trial_title VARCHAR (100) NOT NULL,
    trial_desc VARCHAR (1000),
    land_id int (12),
    owner_id int (12),
    trial_cost float(10,3) not null,
CONSTRAINT PK_USER PRIMARY KEY (trial_id));