//importing the express router

const router = require("express").Router();
const fetch = require('node-fetch');
require('dotenv').config();
const propertyController = require('../controllers/property.controller');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

require('dotenv').config();
const JWT_SECRET_KEY  = process.env.JWT_SECRET_KEY;
//let _token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI4NzI3MjIsImV4cCI6MTY1Mjk1OTEyMn0.RebOAD3KLaXMfU87nHNDUaXiUn2lcIKTXSTdwZH7tcs';

const authenticate = (req, res, next) => {
let _token = res.getHeader('x-access-token');
console.log("Header Authorization Token:", _token);
jwt.verify(_token, JWT_SECRET_KEY, (err, decoded) => {
if(err){
console.log(err.message);
}else{
//return decoded;
next();
}
});
}

//module exports
module.exports = app => {

// Retrieve all Property
router.get("/",authenticate, propertyController.findAll);

// Retrieve a single Property with id
router.get("/:id", authenticate,propertyController.findOne);

// Retrieve a single Property with type
router.get("/:type", authenticate, propertyController.findByType);

// Create a new Property
router.post("/", authenticate, propertyController.create);

// Update a Property with id
router.put("/:id",authenticate, propertyController.update);

// Update a Property's status with id
router.put("/status/:id",authenticate, propertyController.updateStatus);

// Delete a Property with id
router.delete("/:id", authenticate, propertyController.delete);


app.use('/api/v1/property', (req,res,next)=>{
res.header('Access-Control-Allow-Origin', 'http://localhost:'+process.env.PORT);
res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type, Accept, Authorization');
 next();
},router);
};