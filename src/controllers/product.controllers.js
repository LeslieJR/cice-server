const models = require("../models");
//to create a product
const create = async (req, res) => {
  try {
    const { name, description, category, price, images } = req.body;
    
    const newProduct = {
      name,
      description,
      category,
      price,
      images
    };
    //verify if the category is already present
    const categoryValid = await models.category.findById(category);
    if (!categoryValid) {
      return res.status(400).json("This category is not valid");
    }
    const product = await models.product.create(newProduct);
    categoryValid.products.push(product);
    await categoryValid.save();
    return res.status(200).json({product}); 
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};
//to get all products
const getAll = async (req, res) => {
  try {
    const products = await models.product.find().populate("category");
    return res.status(200).json(products);
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};
//to get products by category
const productsByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const productsByCategory = await models.category
      .findById(category_id)
      .populate("products");
    res.status(201).json(productsByCategory);
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};
//to get product by id
const productById = async (req, res) => {
  try {
    const { product_id } = req.params;
    const productById = await models.product.findById(product_id);
    res.status(201).json(productById);
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};
//to delete product by id
const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await models.product.findById(product_id);
    if (!product) {
      return res.json({ error: "PRODUCT DOES NOT EXIST" });
    }
    await models.product.findByIdAndRemove(product_id);
    return res.status(200).json({ msg: "product deleted" });
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};

module.exports = {
  create,
  getAll,
  productsByCategory,
  productById,
  deleteProduct,
};
