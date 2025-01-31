const express = require('express');
const Restaurant = require('../models/Restaurant');

const router = express.Router();

// Get all restaurants
router.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find(); // Fetch all restaurants
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get restaurants by cuisine
router.get("/cuisine/:cuisine", async (req, res) => {
    try {
        const { cuisine } = req.params;
        const restaurants = await Restaurant.find({ cuisine: cuisine });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get restaurants with selected columns and sorting
router.get("/sort", async (req, res) => {
    try {
        const sortOrder = req.query.sortBy == "DESC" ? -1 : 1;
        const restaurants = await Restaurant.find({}, { _id: 1, cuisines: 1, name: 1, city: 1, restaurant_id: 1 })
        .sort({ restaurant_id: sortOrder });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Delicatessen restaurants (excluding Brooklyn)
router.get("/Delicatessen", async (req, res) => {
    try {
        const restaurants = await Restaurant.find({
            cuisine: "Delicatessen",
            city: { $ne: "Brooklyn" }  // Not Brooklyn
        }, { _id: 0, cuisines: 1, name: 1, city: 1 }) 
        .sort({ name: 1 }); // Sort by name (Ascending)
        
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 



// Restaurant.create(
//     [{
//       "address": {
//         "building": "1008",
//         "street": "Morris Park Ave",
//         "zipcode": "10462"
//      },
//      "city": "Bronx",
//      "cuisine": "Bakery",
//      "name": "Morris Park Bake Shop",
//      "restaurant_id": "30075445"
//     },
//     {
//       "address": {
//         "street": "Thai Son Street",
//         "zipcode": null
//      },
//      "city": "Manhattan",
//      "cuisine": "Vietnamese",
//      "name": "Pho Me Long Time",
//      "restaurant_id": "30075455"
//     },
//     {
//       "address": {
//         "building": "253",
//         "street": "East 167 Street",
//         "zipcode": null
//      },
//      "city": "Bronx",
//      "cuisine": "Chicken",
//      "name": "Mom's Fried Chicken",
//      "restaurant_id": "40382900"
//     },
//     {
//       "address": {
//         "building": "120",
//         "street": "East 56 Street",
//         "zipcode": "19800"
//      },
//      "city": "Mahattan",
//      "cuisine": "Italian",
//      "name": "Montebello Restaurant",
//      "restaurant_id": "40397082"
//     },
//     {
//       "address": {
//         "building": "195",
//         "street": "Soprano Street",
//         "zipcode": "17500"
//      },
//      "city": "Staten Island",
//      "cuisine": "Hamburgers",
//      "name": "Joeys Burgers",
//      "restaurant_id": "40397555"
//     },
//     {
//       "address": {
//         "building": "200",
//         "street": "Queens Boulevard",
//         "zipcode": "19700"
//      },
//      "city": "Queens",
//      "cuisine": "American",
//      "name": "Brunos on the Boulevard",
//      "restaurant_id": "40397678"
//     },
//     {
//       "address": {
//         "building": "555",
//         "street": "Sushi Street",
//         "zipcode": "17700"
//      },
//      "city": "Brooklyn",
//      "cuisine": "Japanese",
//      "name": "Iron Chef House",
//      "restaurant_id": "40397699"
//     },
//     {
//       "address": {
//         "building": "555",
//         "street": "Fontana Street",
//         "zipcode": null
//      },
//      "city": "Brooklyn",
//      "cuisine": "Japanese",
//      "name": "Wasabi Sushi",
//      "restaurant_id": "40398000"
//     },
//     {
//       "address": {
//         "building": "900",
//         "street": "Goodfellas Street",
//         "zipcode": "17788"
//      },
//      "city": "Brooklyn",
//      "cuisine": "Delicatessen",
//      "name": "Sal's Deli",
//      "restaurant_id": "40898000"
//     },
//     {
//       "address": {
//         "building": "909",
//         "street": "44 Gangster Way",
//         "zipcode": "17988"
//      },
//      "city": "Queens",
//      "cuisine": "Delicatessen",
//      "name": "Big Tony's Sandwich Buffet",
//      "restaurant_id": "40898554"
//     },
//     {
//       "address": {
//         "building": "1201",
//         "street": "121 Canolli Way",
//         "zipcode": "17989"
//      },
//      "city": "Queens",
//      "cuisine": "Delicatessen",
//      "name": "The Godfather Panini Express",
//      "restaurant_id": "40898554"
//     }]
// )
    