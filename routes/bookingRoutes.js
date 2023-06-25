const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');


/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Book a room
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The booking was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error
 */
router.post('/bookings', bookingController.bookRoom);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: A list of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error
 */
router.get('/bookings', bookingController.getAllBookings);

/**
 * @swagger
 * /bookings/{customerName}:
 *   get:
 *     summary: Get all bookings by a specific customer
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: customerName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of all bookings by the specified customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error
 */
router.get('/bookings/:customerName', bookingController.getBookingsByCustomer);

/**
 * @swagger
 * /bookings/count/{customerName}:
 *   get:
 *     summary: Get the count of all bookings by a specific customer
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: customerName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The count of all bookings by the specified customer and the booking details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customerName:
 *                   type: string
 *                 totalBookings:
 *                   type: integer
 *                 bookings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error
 */
router.get('/bookings/count/:customerName', bookingController.getCustomerBookingCount);


module.exports = router;
