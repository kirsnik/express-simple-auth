require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Sets requests to use json and set req.body

app.use('*', (req, res, next) => {
  console.log(req);
  next();
})

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/readinglist"
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
