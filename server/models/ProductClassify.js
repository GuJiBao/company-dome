const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productClassifySchema = new Schema({
  name: String,
  enName: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ProductClassify", productClassifySchema);
