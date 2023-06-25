const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  seats: { type: Number, required: true },
  amenities: [String],
  pricePerHour: { type: Number, required: true }
});

module.exports = mongoose.model('Room', RoomSchema);
