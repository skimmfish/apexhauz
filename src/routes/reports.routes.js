const router = require("express").Router();

const reportController = require('../controllers/report.controller');

module.exports = app => {

  // Retrieve all Users
  router.get("/", reportController.findAll);

 // Retrieve a single User with id
router.get("/:id", reportController.findOne);

    // Create a new User =========================
    router.post("/", reportController.create);

  // Update a User with id
  router.put("/:id", reportController.update);

  // Delete a User with id
  router.delete("/:id", reportController.delete);

  app.use('/api/v1/report', router);
};