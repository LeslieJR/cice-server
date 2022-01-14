const { Router } = require("express");

const router = Router();
const controllers = require("../controllers");

router.post("/create", controllers.category.create);
router.get("/all", controllers.category.getAll);
router.get("/:category_id", controllers.category.productsByCategory);

module.exports = router;
