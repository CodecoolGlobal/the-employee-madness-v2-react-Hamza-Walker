const mongoose = require("mongoose");

const { Schema } = mongoose;

const WorkLogSchema = new Schema({
  hours: {
    type: Number,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("WorkLog", WorkLogSchema);
