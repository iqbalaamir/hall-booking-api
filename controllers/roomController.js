const Room = require('../models/Room');

// CREATE - Create a new room
exports.createRoom = async (req, res) => {
  const room = new Room(req.body);

  try {
    const savedRoom = await room.save();
    res.status(201).send(savedRoom);
  } catch (err) {
    res.status(400).send(err);
  }
};

// READ - Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (err) {
    res.status(500).send(err);
  }
};

// READ - Get a room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.id });
    if (room) {
      res.status(200).send(room);
    } else {
      res.status(404).send({ message: 'Room not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// UPDATE - Update a room by ID
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate({ roomId: req.params.id }, req.body, { new: true });
    if (room) {
      res.status(200).send(room);
    } else {
      res.status(404).send({ message: 'Room not found' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// DELETE - Delete a room by ID
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ roomId: req.params.id });
    if (room) {
      res.status(200).send({ message: 'Room deleted' });
    } else {
      res.status(404).send({ message: 'Room not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
