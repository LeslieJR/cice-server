const models = require("../models");
//to create a product
const create = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    if(!name || !description || !color){
      return res.status(400).json('Required fields missing')
    }
    const newCategory = {
      name,
      description,
      color
    };
    const category = await models.category.create(newCategory);
    return res.status(200).json(category);
  } catch (e) {
    return res.status(400).json(e.message);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await models.category.find();
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(400).json(e.message);
  }
};

const productsByCategory = async (req, res) => {
  try{
    const { category_id } = req.params;    
    const category = await models.category.findById(category_id).populate("products");
    return res.status(200).json(category.products);  
  }catch(e){
    return res.status(400).json(e.message);
  }

};

module.exports = {
  create,
  getAll,
  productsByCategory,
};
