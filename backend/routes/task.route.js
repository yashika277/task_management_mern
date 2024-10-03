const express = require("express")
const { createTask, deleteTask, updateTask, getMyTask, getSingleTask } = require("../controller/task.controller")

const router = express.Router();

router.post("/post", createTask);
router.delete("/delete/:id", deleteTask)
router.put("/update/:id", updateTask)
router.get("/mytask", getMyTask)
router.get("/single/:id", getSingleTask)


module.exports = router