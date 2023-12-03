const UserLocation = require('../models/UserLocation'); // Adjust the path accordingly

const updateLocation = async (req, res) => {
  const { userId, latitude, longitude } = req.body;

  try {
    await UserLocation.updateOne(
      { userId },
      { $set: { latitude, longitude } },
      { upsert: true }
    );

    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  updateLocation,
};