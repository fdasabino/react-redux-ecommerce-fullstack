const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Create product failed: ${err.message}`);
    ({});
  }
};

exports.listAll = async (req, res) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subCategories")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deletedProduct);
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Remove product failed: ${err.message}`);
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subCategories")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Could not update product", err);
    return res.status(400).send(`Update product failed: ${err.message}`);
  }
};

//PAGINATION
exports.list = async (req, res) => {
  // console.table(req.body);
  //createdAt/updatedAt, desc/asc, limit 5
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 5;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subCategories")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  const total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  const existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    const ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
    return;
  }
  // if user have already left rating, update it
  const ratingUpdated = await Product.updateOne(
    {
      ratings: { $elemMatch: existingRatingObject },
    },
    { $set: { "ratings.$.star": star } },
    { new: true }
  ).exec();
  console.log("ratingUpdated", ratingUpdated);
  res.json(ratingUpdated);
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(4)
    .populate("category")
    .populate("subCategories")
    .exec();

  res.json(related);
};

// SEARCH FILTERING
const handleQuery = async (req, res, query) => {
  // text based search
  const products = await Product.find({ $text: { $search: query } })
    .populate("category")
    .populate("subCategories", "_id name")
    .exec();
  res.json(products);
};

// price [min, max]
const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: { $gte: price[0], $lte: price[1] },
    })
      .populate("category")
      .populate("subCategories", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

// category
const handleCategory = async (req, res, category) => {
  try {
    const products = await Product.find({
      category,
    })
      .populate("category")
      .populate("subCategories", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

//stars
const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subCategories", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
};

// subCategory
const handleSubCategory = async (req, res, subCategory) => {
  const products = await Product.find({ subCategories: subCategory })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .exec();

  res.json(products);
};

//shipping
const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .exec();

  res.json(products);
};

//color
const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .exec();

  res.json(products);
};

//brand
const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .exec();

  res.json(products);
};

exports.searchFilters = async (req, res) => {
  //type of request body
  const {
    query,
    price,
    category,
    stars,
    subCategory,
    shipping,
    color,
    brand,
  } = req.body;
  //-----------

  //text query search bar
  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }

  //sort by price
  if (price !== undefined) {
    console.log("price", price);
    await handlePrice(req, res, price);
  }

  //sort by category
  if (category) {
    console.log("category", category);
    await handleCategory(req, res, category);
  }

  //sort by rating
  if (stars) {
    console.log("stars", stars);
    await handleStar(req, res, stars);
  }

  //sort by sub category
  if (subCategory) {
    console.log("subCategory", subCategory);
    await handleSubCategory(req, res, subCategory);
  }

  //sort by sub shipping
  if (shipping) {
    console.log("shipping", shipping);
    await handleShipping(req, res, shipping);
  }

  //sort by color
  if (color) {
    console.log("color", color);
    await handleColor(req, res, color);
  }

  //sort by brand
  if (brand) {
    console.log("brand", brand);
    await handleBrand(req, res, brand);
  }
};
