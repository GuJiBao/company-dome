const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name: String,
    companyName: String,
    address: String,
    tel: String,
    fax: String,
    email: String,
    website: String,
    skype: String,
    content: String,
    code: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);