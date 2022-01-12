const {Router} = require('express');

const router = Router();
const controllers = require('../controllers');
const helpers = require("../helpers")

router.post('/create-order', helpers.isTokenValid.isTokenValid, controllers.order.createOrder);
router.get('/get-order/:order_id', helpers.isTokenValid.isTokenValid, controllers.order.getOrder);
router.get('/get-all', helpers.isTokenValid.isTokenValid, controllers.order.getOrdersUser);
router.delete('/delete-order/:order_id', helpers.isTokenValid.isTokenValid,controllers.order.deleteOrder);

module.exports = router;