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
    const categoryValid = await models.category.findById(category_id);
    if (!categoryValid) {
      return res.status(400).json("This category is not valid");
    }
    const product = await models.product.create(newProduct);
    categoryValid.products.push(product);
    await categoryValid.save();
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

const productsByCategory = async (req,res)=>{
  const { category_id } = req.params;
  const productsByCategory = await models.category.findById(category_id).populate('products');
  res.status(200).json(productsByCategory);
}
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
  productsByCategory,
  remove
};
