const mongoose = require("mongoose");

const taskShema =new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    default: "low",
  },
});

module.exports = mongoose.model("task", taskShema);
