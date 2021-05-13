const mongoose = require('mongoose');


const answersphotosSchema = new mongoose.Schema({
  answer_id: Number,
  url: String

});

const answersphotosSchema  = mongoose.model('Photo', answersphotosSchema );



module.exports = {model: answersphotosSchema , answersphotosSchema : answersphotosSchema };