const mongoose = require('mongoose');

// Define the contact schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String },
    lockedBy: { type: String }
  }, { timestamps: true });


const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;