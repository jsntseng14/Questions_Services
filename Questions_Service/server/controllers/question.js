const Mergedquestion = require('../../schemas/questionSchema.js');
const Finalanswer = require('../../schemas/answersSchema.js');
const mongoose = require('mongoose');

exports.postAnswer = (params, body, callback) => {
  const filter = {'results.question_id': params.question_id}
  // const update = {$set: {results: {id: 420, body: body.body, date: "Today", answerer_name: body.name, helpfulness: 0, photos: body.photos}}}
  const update = {};
  mongoose.set('useFindAndModify', false);
  Mergedquestion.findOneAndUpdate(filter, update, {new:true, upsert: true}, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(success);
    }
  })
}


exports.reportQuestion = (id, callback) => {
  const filter = {results: {$elemMatch: {question_id: id}}};
  const update = {$set: {'results.0.reported' : true}};
  mongoose.set('useFindAndModify', false);
  Mergedquestion.findOneAndUpdate(filter, update, {new:true, upsert: true, returnOriginal: false}, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(success);
    }
  })
}

exports.markHelpful = function (id, callback) {
  const filter = {results: {$elemMatch: {question_id: id}}};
  const update = {$inc: {'results.0.question_helpfulness' : 1}};
  mongoose.set('useFindAndModify', false);
  Mergedquestion.findOneAndUpdate(filter, update, {new:true, upsert: true, returnOriginal: false}, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(success);
    }
  })
}

exports.markAnswerHelpful = function (id, callback) {
  const filter = {results: {$elemMatch: {answers_id: id}}};
  const update = {$inc: {'results.0.answers.helpfulness' : 1}};
  mongoose.set('useFindAndModify', false);
  Mergedquestion.findOneAndUpdate(filter, update, {new:true, upsert: true, returnOriginal: false}, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(success);
    }
  })
}

exports.reportAnswer = function (id, callback) {
  const filter = {results: {$elemMatch: {answer_id: id}}};
  const update = {$set: {'results.0.reported' : true}};
  mongoose.set('useFindAndModify', false);
  Mergedquestion.findOneAndUpdate(filter, update, {new:true, upsert: true, returnOriginal: false}, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(success);
    }
  })
}

exports.findQuestions = function (id, callback) {
  Mergedquestion.findOne({product_id: id}, {results: {$elemMatch: {reported: false}}}, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  })
}


// counterSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
//   return this.findAndModify(query, sort, doc, options, callback);
// };

// const Answercounter = mongoose.model('Answercounter', counterSchema);


// const getNextSequenceValue = function (sequenceName) {

//   var sequenceDocument = Answercounter.findAndModify({
//     query:{_id: sequenceName},
//     update: {$inc: {sequence_Value: 1}},
//     new:true
//   });
//   return sequenceDocument.sequence_value;
// }

exports.postQuestionByProductId = function (id, body, name, photos, callback) {
  // const update = {results: {question_id: latest, question_body: body, question_date: "temp", asker_name: name, question_helpfulness: 0, reported: false, answers: null}};
  // latest += 1;
  const update = {$push: {results: {question_id: getNextSequenceValue("questionid"), question_body: body, question_date: "temp", asker_name: name, question_helpfulness: 0, reported: false, answers: null}}};
  const filter = {product_id: id};
  mongoose.set('useFindAndModify', false);
  Mergedquestion.findOneAndUpdate(filter, update, {new:true, upsert: true}, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  })
}

exports.findAnswers = function (id, callback) {
  Finalanswer.findOne({question: id}, {results: 1, _id: 0}, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  })
}