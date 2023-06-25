const Booking = require("../models/Booking");
const Room = require("../models/Room");

// CREATE - Book a room
exports.bookRoom = async (req, res) => {
  const { roomId, date, startTime, endTime } = req.body;

  try {
    // Check if room exists
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).send({ message: "Room not found" });
    }

    // Check if room is already booked
    const isRoomBooked = await Booking.findOne({
      roomId,
      date,
      startTime: { $lte: endTime },
      endTime: { $gte: startTime },
    });

    if (isRoomBooked) {
      return res
        .status(400)
        .send({
          message: "Room is already booked for the requested time slot",
        });
    }

    // Create a new booking
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();

    res.status(201).send(savedBooking);
  } catch (err) {
    res.status(500).send(err);
  }
};

// READ - Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).send(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getBookingsByCustomer = async (req, res) => {
  const customerName = req.params.customerName;
  try {
    const bookings = await Booking.find({ customerName });
    res.status(200).send(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
};
// READ - Get booking count and details for a customer
exports.getCustomerBookingCount = async (req, res) => {
    const customerName = req.params.customerName;
    try {
      const bookings = await Booking.find({ customerName })
        .populate('roomId', 'roomName') // Assuming Room model has roomName field
        .select('date startTime endTime _id createdAt status'); // Assuming Booking model has createdAt and status fields
  
      res.status(200).send({
        customerName,
        totalBookings: bookings.length,
        bookings
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };
  