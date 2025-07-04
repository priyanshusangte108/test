const express = require("express")
const { gettodos, gettodo, addtodo, updatetodo, removetodo } = require("../controller/todocontroller")
const router = express.Router()

router.get("/", gettodos)
router.get("/:id", gettodo)
router.post("/", addtodo)
router.put("/:id", updatetodo)
router.delete("/:id", removetodo)


module.exports = router