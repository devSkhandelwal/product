const express = require('express');
const { insertProduct, getProduct } = require('../controller/productController');

const router = express.Router();


router.route("/").post(insertProduct);
router.route("/").get(getProduct);

module.exports = router