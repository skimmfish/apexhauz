const db = require("../config/db.config");

// constructor
class Property {
  constructor(id,owner_id,status,price,state,city,address,type,image_url) {
    this.id = id;
    this.owner_id = owner_id;
    this.status = status;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type=type;
    this.image_url = image_url;
}


/*
*creating a new property
*/
  static create(newProperty, result) {
    db.query('INSERT INTO property VALUES(?,?, ?,?,?,?,?,?,?,?)', [newProperty.id,newProperty.owner_id, newProperty.status,newProperty.price,
        newProperty.state,newProperty.city,newProperty.address,newProperty.type,newProperty.image_url,new Date()], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
     console.log("Created Property: ", { ...newProperty });
      result(null, { id: res.insertId, ...newProperty });
    });
  };

  /*
  *findById - for finding a specific property using the property id
  */
  static findById(id, result) {
    db.query(`SELECT * FROM property p WHERE p.id = ?`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found property: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found
      result({ kind: "not_found" }, null);
    });
  }

/*
*findByType - for finding a specific property using property type
*/
static findByType(type, result) {
db.query("SELECT *FROM property p WHERE p.type=?" , [type], (err, res) => {
      if (err) {
       console.log("error: ", err);
       result(err, null);
        return;
      }

      if (res.length) {
        console.log("found propert(ies) of type : "+type, res[0]);
        result(null, res[0]);
        return;
      }

      // not found
      result({ kind: "not_found" }, null);
    });
  }



  /*
  *Get all properties
  */
  static getAll(result) {
    db.query('SELECT * FROM property', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("All properties: ", res);
      result(null, res);
    });
  }


/*
*update all the data fields of a property using the primary key as the identifier
*/
static updateById(id, property, result) {
db.query(
"UPDATE property SET owner_id=?, status=?, price=?, state=?, city=?, address=?, type=?, image_url=? WHERE id=?",
      [property.owner_id, property.status, property.price, property.state, property.city, property.address, property.type,property.image_url, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated property: ", { ...property });
        result(null, { ...property });
      }
    );
  }
  

/*
*update all property availability status
*@param int id
*@param property object
*@param resultset object
*/
static updatePropertyStatus(id, status, result) {
    db.query(
    "UPDATE property SET status=? WHERE id=?",[status,id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
    
            if (res.affectedRows == 0) {
              // not found
              result({ kind: "not_found" }, null);
              return;
            }
    
            console.log("updated property of id: "+id+" status to: ",status);
            result(null, res[0]);
          }
        );
      };
    

/*
  *deleting a property
  *@param int id
  *@param resultset object
  */
  static delete(id, result) {
    db.query("DELETE FROM property WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted property with id: ", id);
      result(null, res);
    });
  }
};

module.exports = Property;