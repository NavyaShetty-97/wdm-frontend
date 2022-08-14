
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

const loginPage = ({ email, password }) => {
  var errors = {};

  if (email.trim() === "") errors["email"] = "email cannot be empty";
  if (password.trim() === "") errors["password"] = "Password cannot be empty";

  if (password.length < 8)
    errors["password"] = "Password must be at least 8 characters";

  return errors;
};

export default loginPage;
