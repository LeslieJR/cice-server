const { Router } = require("express");

const router = Router();
const controllers = require("../controllers");

router.post("/create", controllers.product.create);
router.get("/all", controllers.product.getAll);
router.get("/byCategory/:category_id", controllers.product.productsByCategory);
router.get("/details/:product_id", controllers.product.productById);
router.delete("/remove/:product_id", controllers.product.deleteProduct);

module.exports = router;
