const express = require("express");

const router = express.Router();

const taskModel = require("../models/task-model");
const {
  createTask,
  getTask,
  deleteTask,
  editTask,
} = require("../controllers/taskController");

router.post("/create", createTask);

router.get("/tasks", getTask);

router.get("/delete/:id", deleteTask);

router.post("/update/:id", editTask);

module.exports = router;
