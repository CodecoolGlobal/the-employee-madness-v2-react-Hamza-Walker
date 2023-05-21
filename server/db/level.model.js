const mongoose = require("mongoose");

const { Schema } = mongoose;

const LevelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },  
    order: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Level", LevelSchema);

