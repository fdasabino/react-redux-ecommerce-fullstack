const express = require("express");
const router = express.Router();

//importing middleware
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

//importing controllers
const {
  createOrUpdateUser,
  currentUser,
} = require("../controllers/authControllers");

// applying the routes
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
