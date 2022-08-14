
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

const propertyHelper = ({ projectname }) => {
    var errors = {};

    if (projectname.trim() === "") errors["projectname"] = "Name cannot be empty";

    return errors;
};

export default propertyHelper;