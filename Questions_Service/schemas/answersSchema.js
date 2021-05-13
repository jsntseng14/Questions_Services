const mongoose = require('mongoose');

const photosSchema = new mongoose.Schema({
  id: Number,
  answer_id: Number,
  url: String
})

const resultsSchema = new mongoose.Schema({
  answer_id: Number,
  body: String,
  date: String,
  answerer_name: String,
  helpfulness: Number,
  photos: [photosSchema]
})

const answersSchema = new mongoose.Schema({
  results: [resultsSchema],
  question: Number,
  page: Number,
  count: Number
});


const Finalanswer = mongoose.model('Finalanswer', answersSchema);

// const find = function (id, callback) {
//   Finalanswer.findOne({question: id}, {results: 1, _id: 0}, (err, success) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, success);
//     }
//   })
// }


module.exports = Finalanswer;