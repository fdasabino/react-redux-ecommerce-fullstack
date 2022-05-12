const Sub_Category = require("../models/subCategorySchema");
const slugify = require("slugify");
const Product = require("../models/productSchema");

//adminCheck
exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(
      await new Sub_Category({ name, parent, slug: slugify(name) }).save()
    );
  } catch (err) {
    console.log(err);
    res.status(400).send("Create sub category failed");
  }
};

//adminCheck
exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updatedSubCategory = await Sub_Category.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updatedSubCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Couldn't update sub category");
  }
};

//adminCheck
exports.remove = async (req, res) => {
  try {
    const deletedSubCategory = await Sub_Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletedSubCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Couldn't delete sub category");
  }
};

// Public
exports.list = async (req, res) =>
  res.json(await Sub_Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let sub = await Sub_Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subCategories: sub })
    .populate("category")
    .exec();

  res.json({
    sub,
    products,
  });
};
