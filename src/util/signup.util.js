
/*
Rajeev Kulkarni, Madhur  - 1001857050
Shetty,Rohan Prakash - 1001969248
Vishwanath Shetty, Navyashree - 1001968039
*/

const signupPage = ({ name, password, firstname, lastname, ancestor, parent }) => {
  var errors = {};
  //Check if username or password is empty
  // errors["username"] = "";
  // errors["password"] = "";

  // if (name.trim() === "") errors["username"] = "Username cannot be empty";
  // if (password.trim() === "") errors["password"] = "Password cannot be empty";
  // if (firstname.trim() === "") errors["username"] = "Username cannot be empty";
  // if (lastname.trim() === "") errors["password"] = "Password cannot be empty";
  // if (ancestorId.trim() === "") errors["username"] = "Username cannot be empty";
  // if (parent.trim() === "") errors["password"] = "Password cannot be empty";

  if (password.length < 8)
    errors["password"] = "Password must be at least 8 characters";

  // if (!isNaN(contact))
  //   errors["contact"] = "Contact Details must be a 10 digit number";
  if (name.length == 0)
    errors["username"] = "Username cannot be empty";

  // if (login.length == 0)
  //   errors["login"] = "Login cannot be empty";
  if (firstname.length == 0)
    errors["firstname"] = "First name cannot be empty";

  if (lastname.length == 0)
    errors["lastname"] = "Last name cannot be empty";
  
  if (ancestor.length == 0)
    errors["ancestorId"] = "Ancestor ID cannot be empty";
  
  if (parent.length == 0)
    errors["parent"] = "Parent name cannot be empty";
  
  return errors;
};

export default signupPage;
