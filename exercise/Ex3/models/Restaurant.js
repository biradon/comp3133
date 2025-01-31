const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  address: {
    building: { type: String },
    street: { type: String, required: true },
    zipcode: { type: String }
  },
  city: { type: String, required: true },
  cuisine: { type: String, required: true },
  name: { type: String, required: true },
  restaurant_id: { type: String, required: true, unique: true }
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
