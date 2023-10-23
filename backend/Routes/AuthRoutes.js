const { register, login } = require("../Controllers/AuthController.js");
const { checkUser } = require("../Middleware/AuthMiddleware.js");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/", checkUser)
router.post("/profile", checkUser)

module.exports = router;
