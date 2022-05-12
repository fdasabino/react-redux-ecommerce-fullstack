const User = require("../models/userSchema");
const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");
const Coupon = require("../models/couponSchema");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  // console.log(req.body);
  const { couponApplied } = req.body;

  // later apply coupon
  // later calculate price

  try {
    // 1 find user
    const user = await User.findOne({ email: req.user.email }).exec();
    // 2 get user cart total
    // Block of code to try
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({
      orderedBy: user._id,
    }).exec();
    // console.log("CART TOTAL", cartTotal, "AFTER DIS%", totalAfterDiscount);
    let finalAmount = 0;

    finalAmount =
      couponApplied && totalAfterDiscount
        ? totalAfterDiscount * 100
        : cartTotal * 100;

    // create payment intent with order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      cartTotal,
      totalAfterDiscount,
      payable: finalAmount,
    });
  } catch (err) {
    // Block of code to handle errors
    console.log("discount Error: ---->", err.message);
  }
};
