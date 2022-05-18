const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET_KEY  = process.env.JWT_SECRET_KEY;

const authenticate = (res, req, next) => {
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI4Njk5MzYsImV4cCI6MTY1Mjk1NjMzNn0.eYdq0BQyAYVgFDlLlZP3wIA1b5GssNguKMWZhv11r2';
//let token = req.get('x-access-token');
console.log("Token:",req.get('x-access-token'));
jwt.verify(token, JWT_SECRET_KEY, (err, decoded, next) => {

if (err) {
//rs.status(401).send(err);
console.log(err)
}else{
//res.send(decoded);
//next();
console.log(decoded);
}
})
}
module.exports = authenticate; 