const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyInfoSchema = new Schema({
    title: String,
    details: String,
    describe: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);