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
      images,
    };
    if(!name || !description || !category || !price || !images){
      return res.status(400).json({err:"Some required fields are empty"})
    }
    if (!images) {
      return res.status(400).json({err:"At least one image is required"});
    }
    //verify if the category is already present
    const categoryValid = await models.category.findById(category);
    if (!categoryValid) {
      return res.status(400).json({err:"This category is not valid"});
    }
    /* if(images){
      return res.status(400).json("You need to upload more than one images");
    } */
    const product = await models.product.create(newProduct);
    categoryValid.products.push(product);
    await categoryValid.save();
    return res.status(200).json({ product });
  } catch (e) {
    return res.status(400).json({err:e.message});
  }
};
//to get all products
const getRecents = async (req, res) => {
  try {
    const products = await models.product
      .find()
      .sort({
        createdAt: "desc",
      })
      .limit(6)
      .populate("category");
    return res.status(200).json(products);
  } catch (e) {
    return res.status(400).json({err:e.message});
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
    return res.status(400).json({err:e.message});
  }
};
//to get product by id
const productById = async (req, res) => {
  try {
    const { product_id } = req.params;
    const productById = await models.product.findById(product_id);
    res.status(201).json(productById);
  } catch (e) {
    return res.status(400).json({err:e.message});
  }
};
//to delete product by id
const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await models.product.findById(product_id);
    if (!product) {
      return res.status(400).json({err:"PRODUCT DOES NOT EXIST"});
    }
    await models.product.findByIdAndRemove(product_id);
    return res.status(200).json({ msg: "product deleted" });
  } catch (e) {
    return res.status(400).json({err:e.message});
  }
};

module.exports = {
  create,
  getRecents,
  productsByCategory,
  productById,
  deleteProduct,
};
