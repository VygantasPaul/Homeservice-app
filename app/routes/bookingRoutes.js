// routes/bookingRoutes.js
const express = require( 'express' );
const router  = express.Router();
const Booking = require( '../models/Booking' );

// Create a booking
router.post( '/', async ( req, res ) => {
    const {
              userId,
              businessId,
              date,
              service
          } = req.body;

    try {
        const newBooking = new Booking( {
            user: userId,
            business: businessId,
            date,
            service,
        } );

        await newBooking.save();
        res.status( 201 ).json( {
            message: 'Booking successful',
            booking: newBooking
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: 'Booking failed',
            error
        } );
    }
} );
// Get bookings by business ID
router.get( '/business/:businessId', async ( req, res ) => {
    const { businessId } = req.params; // Get businessId from route parameters

    try {
        const bookings = await Booking.find( { business: businessId } ); // Find bookings associated with the business ID
        if ( ! bookings.length ) {
            return res.status( 404 ).json( { message: 'No bookings found for this business' } );
        }
        res.status( 200 ).json( { bookings } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: 'Error retrieving bookings',
            error
        } );
    }
} );
// Get bookings by user
router.get( '/:userId', async ( req, res ) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find( { user: userId } );
        if ( ! bookings.length ) {
            return res.status( 404 ).json( { message: 'No bookings found' } );
        }
        res.status( 200 ).json( { bookings } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: 'Error retrieving bookings',
            error
        } );
    }
} );

// Get all bookings
router.get( '/', async ( req, res ) => {
    try {
        const bookings = await Booking.find();
        if ( ! bookings.length ) {
            return res.status( 404 ).json( { message: 'No bookings found' } );
        }
        res.status( 200 ).json( { bookings } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: 'Error retrieving bookings',
            error
        } );
    }
} );

module.exports = router;
