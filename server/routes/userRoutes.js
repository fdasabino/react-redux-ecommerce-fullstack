const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/authMiddlewares");
// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
} = require("../controllers/userControllers");

router.post("/user/cart", authCheck, userCart); // save user cart
router.get("/user/cart", authCheck, getUserCart); // get user cart
router.put("/user/cart", authCheck, emptyCart); // get user cart
router.post("/user/address", authCheck, saveAddress); // save user address

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

//orders
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);

//wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);
module.exports = router;
