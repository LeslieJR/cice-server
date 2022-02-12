const models = require("../models");
const helpers = require("../helpers");
const config = require("../config");
const jwt = require("jsonwebtoken");

// to create an order
const createOrder = async (req, res) => {
  try {
    const { product_id, quantity, data } = req.body;
    const email = data.email;
    const userExist = await models.user.findOne({ email });
    const productExist = await models.product.findById(product_id);
    if (!userExist) {
      return res.status(400).json("User does not exist");
    } else if (userExist && productExist) {
      const newOrder = {
        user_id: data.user_id,
        product: product_id,
        quantity,
      };
      const item = await models.order.create(newOrder);
      return res.status(201).json(item);
    }
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};
//get order by id
const getOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { data } = req.body;
    const email = data.email;
    const order = await models.order.findById(order_id).populate("product");
    const user = await models.user.findOne({ email });
    if (!order) {
      return res.status(400).json({ err: "This order id does not exist" });
    }
    if (JSON.stringify(order.user_id) !== JSON.stringify(user._id)) {
      return res.status(400).json({ err: "This order does not belong to this user id" });
    } else {
      return res.status(201).json(order);
    }
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};
//get all order from user
const getOrdersUser = async (req, res) => {
  try {
    const { data } = req.body;
    const id = data.user_id;
    const user = await models.user.findById(id);
    const orders = await models.order.find({ user_id: id }).populate("product");
    if (!user) {
      return res.status(400).json({ err: "This user does not exist" });
    }
    if (!orders) {
      return res.status(400).json({ err: "This user does not have any current order" });
    } else {
      return res.status(201).json(orders);
    }
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};
//delete order by id
const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { data } = req.body;
    const email = data.email;
    const order = await models.order.findById(order_id);
    const user = await models.user.findOne({ email });
    if (!order) {
      return res.status(400).json({ err: "This order id does not exist" });
    }
    if (JSON.stringify(order.user_id) !== JSON.stringify(user._id)) {
      return res.status(400).json({ err: "This order does not belong to this user id" });
    } else {
      await models.order.findByIdAndRemove(order._id);
      return res.status(201).json("Order deleted");
    }
  } catch (e) {
    return res.status(400).json(e.message);
  }
};

module.exports = {
  createOrder,
  getOrder,
  getOrdersUser,
  deleteOrder,
};
