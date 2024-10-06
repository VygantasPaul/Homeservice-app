// routes/authRoutes.js
const express = require( 'express' );
const jwt     = require( 'jsonwebtoken' );
const router  = express.Router();
const User    = require( '../models/User' );

// Middleware to authenticate JWT token
const authenticate = ( req, res, next ) => {
    const token = req.headers['authorization']?.split( ' ' )[1]; // Bearer <token>
    if ( ! token ) return res.status( 403 ).json( { message: 'No token provided' } );

    jwt.verify( token, process.env.JWT_SECRET, ( err, decoded ) => {
        if ( err ) return res.status( 401 ).json( { message: 'Unauthorized' } );
        req.userId = decoded._id; // Add user ID to request for further use
        next();
    } );
};

router.post( '/register', async ( req, res ) => {
    const {
              username,
              email,
              password
          } = req.body;

    try {
        const newUser = new User( {
            username,
            email,
            password
        } );
        await newUser.save();
        res.status( 201 ).json( { message: 'User registered successfully' } );
    } catch ( error ) {
        res.status( 400 ).json( {
            message: 'User registration failed',
            error
        } );
    }
} );

router.post( '/login', async ( req, res ) => {
    const {
              email,
              password
          } = req.body;

    try {
        const user = await User.findOne( { email } );
        if ( ! user || ! ( await user.comparePassword( password ) ) ) {
            return res.status( 401 ).json( { message: 'Invalid email or password' } );
        }

        // Generate JWT token
        const token = jwt.sign( { _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' } );
        res.json( { token } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: 'Login failed',
            error
        } );
    }
} );

// Get all users
router.get( '/', async ( req, res ) => {
    try {
        const users = await User.find()
        if ( ! users.length ) {
            return res.status( 404 ).json( { message: 'No users found' } );
        }
        res.status( 200 ).json( { users } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: 'Error retrieving users',
            error
        } );
    }
} );

module.exports = router;
