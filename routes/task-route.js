const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks", updateTask);
router.delete("/tasks", deleteTask);
module.exports = router;
