const {Router} = require('express');

const router = Router();
const controllers = require('../controllers');

router.post('/create', controllers.product.create);
router.get('/all', controllers.product.getAll);
router.delete('/remove/:product_id', controllers.product.remove)

module.exports = router;