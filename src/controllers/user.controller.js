const User = require("../models/user.model.js");
const { hash: hashPassword, comparepassword: comparePassword } = require('../utility/password');
const { generate: generateToken } = require('../utility/token');

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      status:"error",
      error: "Content can not be empty!"
    });
  }

// Create a User
const {email,first_name,last_name,password,phone,address,is_admin} = req.body;
//hashing the password before saving to database table
const hashedPassword = hashPassword(password.trim());

const user = new User(email,first_name,last_name,hashedPassword,phone,address,is_admin);

// Save User in the database
User.create(user, (err, data) => {
if (err) {
res.status(500).send({
status: "error",
error: err.message
});
}else{
const token = generateToken(data.id);
res.status(201).send({
status: "success",
data: {
token,
data
}
});
}
});
};


/*
*signin the user, this function generates an auth token - JWToken which is sent within
*the body of the response
*/
exports.signin = (req,res) => {
const {email, password } = req.body;
const hashedPassword = hashPassword(password);
User.signin(email.trim(), hashedPassword, (err,data) => {
if(err){
console.log("Error occured:", err);
if(err.kind==='not_found'){
res.status(404).send({
status: "error",
error: "Couldn't signin user with "+`${email}`+ "and password: "+hashedPassword+" due to mismatched credentials"
});
return;
}else{ res.status(500).send({
status:"Internal Server Error",
error: err.message
});
}
}else if(res){
if (comparePassword(password.trim(), data.password)){
console.log("User successfully identified and authenticated!");
//console.log("User details:", mydata);
const token = generateToken(res.id);
//sending status to the frontend
res.status(200).send({status:"success", data:{token,first_name: res.first_name,last_name: res.last_name,phone: res.phone,is_admin: res.is_admin } });
}
}
})
}


// Update a User identified by the id in the request
exports.updatepassword = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      status: "error",
      error: "Content can not be empty!"
    });
  }

  const {password} = req.body;
  const hashedPassword = hashPassword(password.trim());
  User.changepassword(Number(req.params.id),hashedPassword,(err, data)=>{

        if (err.kind === "not_found") {
          res.status(404).send({
            status: "error",
            error: `Not found User with id ${req.params.id}.`
          });
        }else{
          console.log("User's password updated successfully!");
          res.status(200).send({status: "success",data});
      }
    }
  );
};