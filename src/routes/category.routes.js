const {Router} = require('express');

const router = Router();
const controllers = require('../controllers');

router.post('/create', controllers.category.create);
router.get('/all', controllers.category.getAll);

module.exports = router;