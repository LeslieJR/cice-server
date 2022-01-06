const {Router} = require('express');

const router = Router();
const controllers = require('../controllers');

router.post('/create', controllers.company.create );

module.exports = router;