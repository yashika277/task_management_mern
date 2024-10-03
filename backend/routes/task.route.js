const express = require("express")
const { createTask, deleteTask, updateTask, getMyTask, getSingleTask } = require("../controller/task.controller")
const { isAuthenticated } = require("../middlewares/auth")
const router = express.Router();

router.post("/post", isAuthenticated, createTask);
router.delete("/delete/:id", isAuthenticated, deleteTask)
router.put("/update/:id", isAuthenticated, updateTask)
router.get("/mytask", isAuthenticated, getMyTask)
router.get("/single/:id", isAuthenticated, getSingleTask)


module.exports = router