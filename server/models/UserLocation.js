const mongoose = require('mongoose');

const userLocationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  // add other fields as needed, such as timestamp, accuracy, etc.
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserLocation", userLocationSchema);