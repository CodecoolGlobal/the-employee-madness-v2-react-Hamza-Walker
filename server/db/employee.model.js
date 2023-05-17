// https://mongoosejs.com/
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema
const { Schema } = mongoose;
const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  level: {
    type: String,
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
  height: {
    type: Number,
  },
  hobbies: {
    type: Array,
  }
});


module.exports = mongoose.model("Employee", EmployeeSchema);


