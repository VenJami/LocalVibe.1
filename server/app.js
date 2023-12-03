const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}

// Import the locationController
const locationController = require("./controllers/location");

// Define a route for updating user location
app.post("/api/v1/update-location", locationController.updateLocation);

app.post('/saveLocation', async (req, res) => {
  const { userId, location } = req.body;

  try {
    // Find the user by userId and update the location
    const user = await User.findByIdAndUpdate(userId, {
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Location saved successfully' });
  } catch (error) {
    console.error('Error saving location:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route imports
const user = require("./routes/user");
const post = require("./routes/Post");

app.use("/api/v1", user);
app.use("/api/v1", post);

// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app;