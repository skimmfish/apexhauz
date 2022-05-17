
const Property = require("../models/property.model.js");

// Create and Save a new Property
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
        status: "error",
      error: "Content can not be empty!"
    });
  }

// Create a Property
const {id,owner_id,status,price,state,city,address,type,image_url} = req.body;
const property = new Property(id,owner_id,status,price,state,city,address,type,image_url);

// Save User in the database
Property.create(property, (err, data) => {
if (err)
res.status(500).send({
        status: "error",
        error:  err.message || "Some error occurred while creating the Property."
      });
    else res.send({status:"success",data});
  });
};

// Retrieve all users from the database
exports.findAll = (req, res) => {
Property.getAll((err, data) => {
if (err)
res.status(500).send({
    error: "error",   
    error: err.message || "Some error occurred while retrieving property."
      });
    else res.send({status: "success",data});
  });
};

// Find a single Property by Id
exports.findOne = (req, res) => {
  Property.findById(Number(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            status:"error",
          error: `Not found Property with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
            status:"error",
          error: "Error retrieving Property with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};



// Find a single Property by type
exports.findByType = (req, res) => {
    Property.findByType(String(req.param.type), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
              status:"error",
            error: `Not found Property of type ${req.query.type}.`
          });
        } else {
          res.status(500).send({
              status:"error",
            error: "Error retrieving Property of type: " + req.query.search
          });
        }
      } else{console.log(req.query.search);
       res.send({status:"success",data: req.query.search+":"+ data});
    }
    });
  };
  

// Update a Property identified by the id in the request
exports.update = (req, res) => {
// Validate Request
  if (!req.body) {
    res.status(400).send({
        status: "error",
      error: "Content can not be empty!"
    });
  }

  //this const object is request body payload obtained through the frontend
  const {owner_id,status,price,state,city,address,type,image_url} = req.body;
  Property.updateById(
    Number(req.params.id),
    new Property(req.params.id,owner_id,status,price,state,city,address,type,image_url),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
              status: "error",
            error: `Not found Property with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
              status:"error",
            error: "Error updating Property with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};



// Update a Property identified by the id in the request
exports.updateStatus = (req, res) => {
    // Validate Request
      if (!req.body) {
        res.status(400).send({
        status: "error",
        error: "Content can not be empty!"
        });
      }
    
      //this const object is request body payload obtained through the frontend
      const {status} = req.body;
      Property.updatePropertyStatus(Number(req.params.id),req.body.status,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                  status: "error",
                error: `Not found Property with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                  status:"error",
                error: "Error updating Property with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
    };
    

// Delete a Property with the specified id in the request
exports.delete = (req, res) => {
Property.delete(Number(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
            status:"error",
          error: `Not found Property with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
            status: "error",
          error: "Could not delete Property with id " + req.params.id
        });
      }
    } else res.send({ 
        status: "success",
        message: `Property was deleted successfully!` });
  });
};
