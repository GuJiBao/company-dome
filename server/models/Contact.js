const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  tel: String,
	phone: String,
	email: String,
  address: String,
  enAddress: String,
	skype: String,
	weChat: String,
	whatsApp: String,
	qq: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contact", contactSchema);
