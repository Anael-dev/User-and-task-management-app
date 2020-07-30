const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let TodoSchema = new Schema({
  userId: Number,
  title: String,
  completed: Boolean,
  priority: String,
  dueDate: Date,
});

module.exports = mongoose.model("todos", TodoSchema);
