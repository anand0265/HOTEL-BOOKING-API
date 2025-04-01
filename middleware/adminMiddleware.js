const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const adminMiddleware = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Check if the token exists after splitting
    if (!token || token === "null" || token === "undefined") {
        return res.status(401).json({ message: "Invalid token format." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the user has admin privileges
        if (!user.isAdmin) {
            return res.status(403).json({ message: "Access forbidden. Admins only." });
        }

        // Attach the user object to the request
        req.user = user;
        next();

    } catch (error) {
        console.error("Token Verification Error:", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired." });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: "Invalid token." });
        } else {
            res.status(500).json({ message: "Server error during token verification." });
        }
    }
};

module.exports = adminMiddleware;
