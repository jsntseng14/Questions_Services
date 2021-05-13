const mongoose = require('mongoose');


const productsSchema = new mongoose.Schema({
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number
});

const Product = mongoose.model('Product', productsSchema);



module.exports = {model: Product, productsSchema: productsSchema};