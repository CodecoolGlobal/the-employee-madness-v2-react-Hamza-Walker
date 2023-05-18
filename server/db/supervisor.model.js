// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const SupervisorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Supervisor", SupervisorSchema);


