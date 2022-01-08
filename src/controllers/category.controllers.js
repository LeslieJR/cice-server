const models = require("../models");
//to create a product
const create =  async (req, res) => {
    try {
      const { name, description } = req.body;
      const newCategory = {
          name,
          description,
      }
      const category = await models.category.create(newCategory);
      return res.status(200).json(category);
    } catch (e) {
      console.log("error: ", e.message);
    }
  };

const getAll =  async (req, res) => {
  try {
    const categories = await models.category.find();
    return res.status(200).json(categories);
  } catch (e) {
    console.log("error: ", e.message);
  }
};


module.exports = {
    create, 
    getAll
}