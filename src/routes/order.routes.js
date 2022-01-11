const {Router} = require('express');

const router = Router();
const controllers = require('../controllers');
const helpers = require("../helpers")

router.post('/add-item', helpers.isTokenValid.isTokenValid ,controllers.order.createOrder);

module.exports = router;