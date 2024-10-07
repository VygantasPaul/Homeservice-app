const jwt = require('jsonwebtoken');

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];  // Get the Authorization header
    const token = authHeader && authHeader.split(' ')[1];  // Get the token from the header

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Save the user information from the token payload in the request
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
