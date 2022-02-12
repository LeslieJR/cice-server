const models = require("../models");

//to create a company
const create = async (req, res) => {
  try {
    const { name, address, history } = req.body;
    const newCompany = {
      name,
      address,
      history,
    };
    const company = await models.company.create(newCompany);
    return res.status(200).json(company);
  } catch (e) {
    return res.status(400).json(e.message);
  }
};

module.exports = {
  create,
};
