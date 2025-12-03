// utils/guestToken.js
const jwt = require("jsonwebtoken");

const getGuestToken = (dashboardId) => {
  const payload = {
    dashboardId,
    user: { id: 1, username: "guest" },
    role: "Gamma",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

module.exports = { getGuestToken };
