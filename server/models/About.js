const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  images: Array,
  details: String,
  enDetails: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("About", aboutSchema);