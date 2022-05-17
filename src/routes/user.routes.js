const router = require("express").Router();
const userController = require('../controllers/user.controller');
const { asyncHandler } = require('../middlewares/asyncHandler');
const { signup: signupValidator, signin: signinValidator, passwordcheck: passwordCheck } = require('../validators/userauth');

module.exports = app => {
//New user signup route
router.route("/signup").post(signupValidator, asyncHandler(userController.create));

//Signin route with signinValidator middleware
router.route("/signin").post(signinValidator, asyncHandler(userController.signin));

//optionals, using the passwordCheck validator to check if the password follows the standard
router.route("/updatepassword/:id").put(passwordCheck, asyncHandler(userController.updatepassword));

app.use('/api/v1/users', router);
};