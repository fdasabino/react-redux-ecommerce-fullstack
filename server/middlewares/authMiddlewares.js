const admin = require("../firebase/firebase");
const User = require("../models/userSchema");

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    // console.log(firebaseUser);

    req.user = firebaseUser;

    next();
  } catch (err) {
    console.log(err);

    res.status(401).json({
      error: "Invalid or expired token",
      error: err.message,
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({ err: "Admin resource. Access denied!" });
  } else {
    next();
  }
  return;
};
