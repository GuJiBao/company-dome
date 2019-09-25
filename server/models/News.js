const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsInfoSchema = new Schema({
    title: String,
    enTitle: String,
    details: String,
    enDetails: String,
    author: String,
    enAuthor: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('News', newsInfoSchema);