const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: "Coupon is required",
      minLength: [6, "Coupon must be at least 6 characters long"],
      maxLength: [12, "Coupon must be at most 12 characters long"],
    },
    expiry: {
      type: Date,
      required: "Expiry date is required",
    },
    discount: {
      type: Number,
      required: "Discount is required",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
