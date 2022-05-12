const Category = require("../models/categorySchema");
const Product = require("../models/productSchema");
const SubCategory = require("../models/subCategorySchema");
const slugify = require("slugify");

//adminCheck
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};

//adminCheck
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Couldn't update category");
  }
};

//adminCheck
exports.remove = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletedCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Couldn't delete category");
  }
};

// Public
exports.list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category }).populate("category").exec();

  res.json({ category, products });
};

// finding all sub_categories with a parent category
exports.getSubCategory = async (req, res) => {
  SubCategory.find({ parent: req.params._id }).exec((err, subCategories) => {
    if (err) console.log(err);
    res.json(subCategories);
  });
};
