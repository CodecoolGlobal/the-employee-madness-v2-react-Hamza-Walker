const mongoose = require("mongoose");
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
  hobbies: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Hobbie',
    },
  
});

module.exports = mongoose.model("Employee", EmployeeSchema);
