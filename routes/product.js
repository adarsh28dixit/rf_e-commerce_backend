var express = require('express');
const {getProducts, createProducts, getProductById, getProductsByType, getProductsByColors} = require('../controllers/product');
const { createValidator } = require('express-joi-validation');
const { uploadProductValidation } = require('../validation');

var router = express.Router();
const validator = createValidator();

router.get('/getProducts', getProducts)
router.post('/createProducts',validator.body(uploadProductValidation), createProducts)
router.get('/getProductById/:id', getProductById)
router.get('/getProductByType/:type', getProductsByType)
router.get('/getProductByColor/:color', getProductsByColors)

module.exports = router;
