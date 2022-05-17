//importing the express router

const router = require("express").Router();
const propertyController = require('../controllers/property.controller');
const decodeToken = require('../middlewares/authenticate');

let authenticate = (res,req,next)=> {
    const tokenState = decode.decode(res.header('x-access-token'));
console.log(res.header('token'));
    if(tokenState){ res.send({jwt: res.header('x-access-token') }); next();}else{ return; }
    }


//module exports
module.exports = app => {


    // Retrieve all Property
router.get("/",function(res,req,next){
let token = decodeToken(req.header('token')); if(token)next();
}, propertyController.findAll);

// Retrieve a single Property with id
router.get("/:id", decodeToken,propertyController.findOne);

// Retrieve a single Property with type
router.get("/:type", decodeToken, propertyController.findByType);

// Create a new Property
router.post("/", decodeToken, propertyController.create);

// Update a Property with id
router.put("/:id", propertyController.update);

// Update a Property's status with id
router.put("/status/:id",decodeToken, propertyController.updateStatus);

// Delete a Property with id
router.delete("/:id", decodeToken, propertyController.delete);

app.use('/api/v1/property', router);
};