const models = require("../models");
const helpers = require("../helpers");
const config = require("../config")
const jwt = require("jsonwebtoken");

// to create an order
const createOrder = async (req, res) => {
    try {
      const {product_id, data } = req.body;
      const email = data.email;
      const userExist = await models.user.findOne({ email });
      const productExist = await models.product.findById(product_id);
      console.log(JSON.stringify(productExist))
      if (!userExist) {
        return res.status(400).json("User does not exist");
      } else if(userExist && productExist) {
        const newOrder = {
          user_id: data.user_id,
          product_id,
          quantity: 2
        };
        const item = await models.order.create(newOrder);
        return res.status(201).json(item);
      }
    } catch (e) {
      console.log("error: ", e.message);
      return res.json({ err: e.message})
    }
  };
  
  const getOrder = async (req, res) => {
    try {
     
        return res.status(201).json(order);
      
    } catch (e) {
      console.log("error: ", e.message);
      return res.json({ err: e.message})
    }
  };
  
  module.exports={
      createOrder,
      getOrder
  }