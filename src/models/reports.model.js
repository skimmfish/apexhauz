const db = require("../config/db.config");

// constructor
class Property {
  constructor(id, owner_id,status,price,state,city,address,type,image_url,created_on) {
    this.id = id;
    this.owner_id = owner_id;
    this.status = status;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type=type;
    this.image_url = image_url;
    this.created_on = created_on;
  }

  static create(newProperty, result) {
    db.query(`INSERT INTO property VALUES(?, ?, ?,?,?,?,?,?,?,?)`, [newProperty.id, newProperty.owner_id, newProperty.status,newProperty.price,
        newProperty.state,newProperty.city,newProperty.address,newProperty.type,newProperty.image_url,newProperty.created_on], (err, res) => {
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
    db.query(`SELECT * FROM property WHERE id = ?`, [id], (err, res) => {
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
  *Get all properties
  */
  static getAll(result) {
    db.query('SELECT * FROM property', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("properties: ", res);
      result(null, res);
    });
  }


  /*
  *update all the data fields of a property using the primary key as the identifier
  */
  static updateById(id, property, result) {
    db.query(
      "UPDATE property SET owner_id = ?, status = ?, price = ?, state=?, city=?, address=?, type=?, image_url=?, created_on=> WHERE id = ?",
      [property.owner_id, property.status, property.price, property.state, property.city, property.address, property.type,property.image_url,property.created_on, id],
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
  *deleting a property
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

}

module.exports = Property;