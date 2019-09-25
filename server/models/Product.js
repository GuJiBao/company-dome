const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  enName: String,
  no: String,
  unit: String,
  classify: {
      type: Schema.Types.ObjectId,
      ref: 'ProductClassify'
  },
  image: Object,
  hot: {
    type: Boolean,
    default: false
  },
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

module.exports = mongoose.model("Product", productSchema);
