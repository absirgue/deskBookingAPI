/**
 * Routes of Booking request, linked to function of '../controllers/booking.js'
 * 
 * Author: asirgue
 * Version: 4.0
 */

const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')


const BookingControllers = require('../controllers/booking');

router.post('/create_booking',checkAuth,BookingControllers.create_booking);

router.get('/:userId/get_user_booking',checkAuth,BookingControllers.get_user_booking);

router.get('/:companyId/get_bookings',checkAuth,BookingControllers.get_bookings);

module.exports = router;