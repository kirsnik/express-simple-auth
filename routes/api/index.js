const router = require("express").Router();
const authRoutes = require('./auth');
const bookRoutes = require("./books");

// Register public auth api routes
router.use("/auth", authRoutes);

// Register book routes
router.use("/books", bookRoutes);

module.exports = router;
