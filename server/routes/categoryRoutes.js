const express = require("express");
const router = express.Router();

//importing middleware
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

//importing controllers
const {
  create,
  read,
  update,
  remove,
  list,
  getSubCategory,
} = require("../controllers/categoryControllers");
// applying the routes
router.post("/category", authCheck, adminCheck, create); // create category, admin access.
router.put("/category/:slug", authCheck, adminCheck, update); // update category, admin access.
router.delete("/category/:slug", authCheck, adminCheck, remove); // remove category, admin access.
router.get("/categories", list); // list all categories public access
router.get("/category/:slug", read); // get category by name public access
router.get("/category/sub-category/:_id", getSubCategory); // get category by id public access

module.exports = router;
