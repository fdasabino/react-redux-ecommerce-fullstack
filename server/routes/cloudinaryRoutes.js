const express = require("express");
const router = express.Router();

//importing middleware
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

//importing controllers
const { upload, remove } = require("../controllers/cloudinaryControllers");

// applying the routes
router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimages", authCheck, adminCheck, remove);

module.exports = router;
