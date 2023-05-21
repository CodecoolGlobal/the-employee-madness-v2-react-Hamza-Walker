const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema ({
    name : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model ('Company' , CompanySchema)