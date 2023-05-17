// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const HobbiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Hobbie", HobbiesSchema);


