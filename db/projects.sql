
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

CREATE TABLE projects(
    project_id int (12) AUTO_INCREMENT,
    project_title VARCHAR (100) NOT NULL,
    project_desc VARCHAR (1000),
    land_id int (12),
    owner_id int (12),
    project_cost float(10,3) not null,
CONSTRAINT PK_USER PRIMARY KEY (project_id));