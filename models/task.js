const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  striked: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
