const express = require("express")
const { registerUser, login, privatecontroller } = require("../controller/authcontroller")

const router = express.Router()

router.post("/" ,registerUser )
router.post("/login",login)
router.post('/private', privatecontroller)

module.exports = router