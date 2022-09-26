const {Router} = require('express');

const router = Router();
const LoginController = require("../controller/LoginController");

router.post("/login", LoginController.login);

module.exports = router;