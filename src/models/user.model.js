const db = require("../config/db.config");

// constructor
class User{
  constructor(email,first_name,last_name,password,phone,address,is_admin) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.is_admin = is_admin;
    this.password = password;
  }


/*
*Creating a new user - signup 
*/
static create(newUser,cb) {
db.query('INSERT INTO users VALUES(null,?,?,?,?,?,?,?,?)', [ newUser.email,newUser.first_name, newUser.last_name,newUser.password,newUser.phone,
        newUser.address,newUser.is_admin, new Date()], (err, res) => {
          if (err) {
              cb(err, null);
              return;
          }
          cb(null, {
              id: res.insertId,
              firstname: newUser.first_name,
              lastname: newUser.last_name,
              email: newUser.email
          });
  });
};


  /*
  *Authenticating a user to signup the user in - Signin a user
  */
  static signin(email,password, cb) {
db.query("SELECT *FROM users WHERE email=? AND is_admin=?", [email,1], (err, res) => {
        if (err) {
          cb(err, null);
            return;
        }
        if (res.length) {
            cb(null, res[0]);
            return;
        }
        cb({ kind: "not_found" }, null);
    })
}

/*
*User can update password
*/
static changepassword(id,password,cb){
db.query("UPDATE users SET password=? WHERE id=?", [password,id], (err,res)=>{
if(err){
cb(err,null); return;
}
if(res.length){
cb(null,res[0]);
return;
}
cb({kind: "user not found"}, null);

});
//end of changepassword function
}
}

module.exports = User;