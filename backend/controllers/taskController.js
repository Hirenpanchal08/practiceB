const taskModel = require("../models/task-model");

const createTask = async (req, res) => {
  // console.log(req.body);
  try {
    const { text, priority } = req.body;
    // Creating the new task in the database
    const task = await taskModel.create({
      title: text,
      priority,
    });
    // Sending the created task back as a response
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    // Fetching all tasks from the database
    const tasks = await taskModel.find();

    // Sending the tasks back as a response
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Assuming the task ID is in the route parameter

    // Ensure the taskId is in the correct format (Mongo ObjectId)
    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    // Deleting the task from the database
    const deletedTask = await taskModel.findOneAndDelete({ _id: taskId });

    // If the task wasn't found, return a message
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Sending the deleted task back as a response
    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const editTask = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params; // Access task id directly from req.params
    const { status } = req.body; // Get new status from request body

    // Find and update the task by task id
    const edited = await taskModel.findOneAndUpdate(
      { _id: id }, // Search for the task by id
      { status }, // Update the status field
      { new: true } // Optionally return the updated document
    );

    // Check if the task was found and updated
    if (!edited) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Send a successful response with the updated task
    res.json({ message: "Task updated successfully", edited });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Something went wrong");
  }
};



module.exports = { createTask, getTask, deleteTask, editTask };
