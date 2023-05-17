const mongoose = require("mongoose");

const { Schema } = mongoose;

const HobbieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Hobbie", HobbieSchema);
