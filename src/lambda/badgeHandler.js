const UserBadgeModel = require("../models/userBadgeModel");
const badgeModel = require("../models/badgeModel");

const getBadges = async (event) => {
  try {
    const badges = await badgeModel.getBadges();
    return {
      statusCode: 200,
      body: JSON.stringify({
        version: "v1",
        data: badges,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving badges",
        error: err.message,
      }),
    };
  }
};

const assignBadge = async (event) => {
  const { user_id, badge_id } = JSON.parse(event.body); // Parse the request body

  try {
    // First, check if the badge exists in the badge_master table
    const badge = await badgeModel.getUserBadges(badge_id);
    if (!badge) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Badge not found" }),
      };
    }

    // Assign the badge to the user
    const assignedBadge = await UserBadgeModel.assignBadgeToUser(
      user_id,
      badge_id
    );

    if (assignedBadge) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Badge assigned successfully",
          assignedBadge,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Badge already assigned to this user",
        }),
      };
    }
  } catch (err) {
    console.error("Error assigning badge:", err); // Log the error to the console
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error assigning badge",
        details: err.message,
      }),
    };
  }
};

const getBadgesByUserId = async (event) => {
  const { user_id } = event.pathParameters; // Get user_id from path parameters

  try {
    const badges = await UserBadgeModel.getBadgesByUserId(user_id);
    return {
      statusCode: 200,
      body: JSON.stringify(badges),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching badges", details: err }),
    };
  }
};

module.exports = {
  getBadges,
  assignBadge,
  getBadgesByUserId,
};
