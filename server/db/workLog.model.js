const mongoose = require('mongoose');

const { Schema } = mongoose;

const workLogSchema = new Schema([{
    task : { 
        type: String, 
        required: true },
    time : { 
        type: Number, 
        required: true },
}])

module.exports = mongoose.model('WorkLog', workLogSchema, 'workLog')