const { Client } = require("pg");

// PostgreSQL connection configuration using Client with your credentials
const client = new Client({
  user: "germane_swift", // Your PostgreSQL username
  host: "swiftdb.c5k0kmyg2vmm.eu-north-1.rds.amazonaws.com", // Your PostgreSQL host
  database: "postgres", // Your database name
  password: "Swift_123", // Your PostgreSQL password
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Dummy data for spinwheel_offers table (specific to a streaming app)
const offers = [
  {
    offer_id: 1,
    probability_percentage: 20.0,
    is_active: true,
    offer_name: "Free Subscription",
    offer_description: "Enjoy a 1-month free subscription to premium content.",
    offer_type: "subscription",
    offer_value: "1 Month Free",
  },
  {
    offer_id: 2,
    probability_percentage: 15.0,
    is_active: true,
    offer_name: "Movie Voucher",
    offer_description: "Watch one premium movie for free.",
    offer_type: "voucher",
    offer_value: "1 Free Movie",
  },
  {
    offer_id: 3,
    probability_percentage: 10.0,
    is_active: true,
    offer_name: "Extra Screens",
    offer_description: "Add 2 extra screens for a month.",
    offer_type: "benefit",
    offer_value: "2 Extra Screens",
  },
  {
    offer_id: 4,
    probability_percentage: 25.0,
    is_active: true,
    offer_name: "Discount on Annual Plan",
    offer_description: "Get a 20% discount on an annual subscription plan.",
    offer_type: "discount",
    offer_value: "20% Off Annual Plan",
  },
  {
    offer_id: 5,
    probability_percentage: 5.0,
    is_active: true,
    offer_name: "Merchandise Coupon",
    offer_description: "Redeem $10 off on Swift TV merchandise.",
    offer_type: "merchandise",
    offer_value: "$10 Off Merchandise",
  },
  {
    offer_id: 6,
    probability_percentage: 10.0,
    is_active: true,
    offer_name: "Exclusive Series Access",
    offer_description: "Get early access to the latest exclusive series.",
    offer_type: "benefit",
    offer_value: "Exclusive Series",
  },
  {
    offer_id: 7,
    probability_percentage: 5.0,
    is_active: true,
    offer_name: "Ad-Free Viewing",
    offer_description: "Enjoy an ad-free experience for 1 month.",
    offer_type: "subscription",
    offer_value: "1 Month Ad-Free",
  },
  {
    offer_id: 8,
    probability_percentage: 5.0,
    is_active: true,
    offer_name: "Live Event Pass",
    offer_description: "Watch one live event for free.",
    offer_type: "event",
    offer_value: "1 Live Event",
  },
  {
    offer_id: 9,
    probability_percentage: 3.0,
    is_active: true,
    offer_name: "Mega Prize",
    offer_description: "Win a 1-year premium subscription.",
    offer_type: "jackpot",
    offer_value: "1 Year Free",
  },
  {
    offer_id: 10,
    probability_percentage: 2.0,
    is_active: true,
    offer_name: "Custom Playlist Feature",
    offer_description: "Get access to create unlimited custom playlists.",
    offer_type: "feature",
    offer_value: "Unlimited Playlists",
  },
];

// Insert offers into the database
const insertOffers = async () => {
  try {
    await client.connect(); // Connect to the database
    for (const offer of offers) {
      const query = `
        INSERT INTO spinwheel_offers (offer_id, probability_percentage, is_active, offer_name, offer_description, offer_type, offer_value, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW());
      `;
      const values = [
        offer.offer_id,
        offer.probability_percentage,
        offer.is_active,
        offer.offer_name,
        offer.offer_description,
        offer.offer_type,
        offer.offer_value,
      ];
      await client.query(query, values);
    }
    console.log("Offers inserted successfully!");
  } catch (err) {
    console.error("Error inserting offers:", err);
  } finally {
    await client.end(); // Close the connection
  }
};

// Execute the insertion
insertOffers();
