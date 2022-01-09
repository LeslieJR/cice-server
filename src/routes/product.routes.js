const {Router} = require('express');

const router = Router();
const controllers = require('../controllers');

router.post('/create', controllers.product.create);
router.get('/all', controllers.product.getAll);
router.get('/:category_id', controllers.product.productsByCategory);
router.delete('/remove/:product_id', controllers.product.remove)

module.exports = router;