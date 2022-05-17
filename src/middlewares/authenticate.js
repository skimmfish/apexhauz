const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY  = process.env.JWT_SECRET_KEY;

const authenticate = (res, req, next) => {
let token = res.header('x-access-token');

jwt.verify(JSON.stringify(token), JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
       res.status(401).send(err);
       console.log(err)
    } else {
        req.id = decoded._id;
        next();
    }
})
}
module.exports = authenticate; 