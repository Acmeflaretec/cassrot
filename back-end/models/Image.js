
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  totalDays: { type: Number, required: true },
  descriptionHeading: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', imageSchema);
