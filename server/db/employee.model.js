// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Object,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  height : {
    type : Number,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);


