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
} = require("../controllers/subCategoryControllers");
// applying the routes
router.post("/sub-category", authCheck, adminCheck, create); // create category, admin access.
router.put("/sub-category/:slug", authCheck, adminCheck, update); // update category, admin access.
router.delete("/sub-category/:slug", authCheck, adminCheck, remove); // remove category, admin access.
router.get("/sub-categories", list); // list all categories public access
router.get("/sub-category/:slug", read); // get category by name public access

module.exports = router;
