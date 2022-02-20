const { Router } = require("express");

const router = Router();
const controllers = require("../controllers");
const helpers = require("../helpers");

router.post("/create", helpers.isTokenValid.isTokenValid, controllers.product.create);
router.get("/recents", controllers.product.getRecents);
router.get("/category/:category_id", controllers.product.productsByCategory);
router.get("/details/:product_id", controllers.product.productById);
router.delete("/remove/:product_id", helpers.isTokenValid.isTokenValid, controllers.product.deleteProduct);

module.exports = router;
