const { generateProducts } = require('../controllers/products-testController');
const { cookieControl } = require("../middleware/cookieControl");

const {Router}= require('express');
const routerProductsTest = new Router();

routerProductsTest.get("/", cookieControl, generateProducts);


module.exports = routerProductsTest;