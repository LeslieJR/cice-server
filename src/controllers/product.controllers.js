const models = require("../models");
//to create a product
const create = async (req, res) => {
  try {
    const { name, description, category_id, price } = req.body;
    const newProduct = {
      name,
      description,
      category_id,
      price,
    };
    //verify if the category is already present
    const isCategoryValid = await models.category.findById(category_id);
    if (!isCategoryValid) {
      return res.status(400).json("This category is not valid");
    }
    const product = await models.product.create(newProduct);
    return res.status(200).json(product);
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const getAll =  async (req, res) => {
  try {
    const products = await models.product.find().populate('category_id');
    return res.status(200).json(products);
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const getByCategory = async (req, res) => {
  try {
    // TO DO
    return res.status(200).json(products);
  } catch (e) {
    console.log("error: ", e.message);
  }
};

const remove = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await models.product.findById(product_id);
    if (!product) {
      return res.json({ error: "PRODUCT DOES NOT EXIST" });
    }
    await models.product.findByIdAndRemove(product_id)
    return res.status(200).json({ msg: "product deleted" });
  } catch (e) {
    console.log("error: ", e.message);
  }
};

module.exports = {
  create,
  getAll,
  getByCategory,
  remove
};
