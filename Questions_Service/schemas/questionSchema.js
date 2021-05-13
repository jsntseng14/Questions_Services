const mongoose = require('mongoose');

const answersSchema = new mongoose.Schema({

})

const resultsSchema = new mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: {
    type: Object,
    unique: true
  }
})

const questionsSchema = new mongoose.Schema({
  product_id: Number,
  results: [resultsSchema]
});




const Mergedquestion = mongoose.model('Mergedquestion', questionsSchema);


module.exports = Mergedquestion;




// db.questions.aggregate(
//   [
//   {
//     $group:
//       {
//         _id: "$product_id",
//         results: { $push: {question_id: "$id", question_body: "$body", question_date: "$date_written", asker_name: "$asker_name", question_helpfulness: "$helpful", reported: {
//           $cond: {if: { $eq: ["$reported", 1]}, then: true, else: false}
//         }}}
//       }
//   },
//   {$unwind: "$results"},
//   {
//     $lookup:
//       {
//         from: "correctanswers",
//         localField: "results.question_id",
//         foreignField: "_id",
//         as: "results.answers"
//       }
//   },
//   {$sort: {product_id: 1, "results.answers.id": 1, "results.question_id": 1}},
//   {$project: {
//     "_id": 1,
//     "results.question_id": 1,
//     "results.question_body": 1,
//     "results.question_date": 1,
//     "results.asker_name": 1,
//     "results.question_helpfulness": 1,
//     "results.reported": 1,
//     "results.answers": {$arrayToObject: {$arrayElemAt: ["$results.answers.results", 0]}}
//   }},
//   {
//     $group:
//       {
//         _id: "$_id",
//         results: { $push: "$results"}
//       }
//   },
//   {$project: {
//     "_id": 0,
//     "product_id": "$_id",
//     "results.question_id": 1,
//     "results.question_body": 1,
//     "results.question_date": 1,
//     "results.asker_name": 1,
//     "results.question_helpfulness": 1,
//     "results.reported": 1,
//     "results.answers": 1,
//   }},
//   {$out: {
//     db: "Question_Service",
//     coll: "mergedquestions"
//   }}
// ],

// {allowDiskUse: true}).pretty()


// db.answers.aggregate(
//   [
//   {
//     $group:
//       {
//         question: "$question_id",
//         page: 0,
//         count: 5,
//         results: { $push: {answer_id: "$id", question_body: "$body", date: "$date_written", answerer_name: "$answerer_name", helpfulness: "$helpful", reported: {
//           $cond: {if: { $eq: ["$reported", 1]}, then: true, else: false}
//         }}}

//       }
//   }
// ],

//   {allowDiskUse: true}).pretty()



// db.questions.aggregate(
//   [
//   {$sort: {product_id: 1}},
//   {
//     $group:
//       {
//         _id: "$product_id",
//         results: { $push: {question_id: "$id", question_body: "$body", question_date: "$date_written", asker_name: "$asker_name", question_helpfulness: "$helpful", reported: {
//           $cond: {if: { $eq: ["$reported", 1]}, then: true, else: false}
//         }}}
//       }
//   },
//   {$project: {
//     "_id": 0,
//     "product_id": "$_id",
//     "results.question_id": 1,
//     "results.question_body": 1,
//     "results.question_date": 1,
//     "results.asker_name": 1,
//     "results.question_helpfulness": 1,
//     "results.reported": 1,
//   }}
// ],

// {allowDiskUse: true}).pretty()

// //**reformating answers */

// db.answers.aggregate(
//   [
//   {$sort: {id: 1}},
//   {
//     $lookup:
//       {
//         from: "answers_photos",
//         localField: "id",
//         foreignField: "answer_id",
//         as: "photos"
//       }
//   },
//   {
//     $group:
//       {
//         _id: "$question_id",
//         results: {$push: {"k": {$toString: "$id"}, "v": {id: "$id", body: "$body", date: "$date_written", answerer_name: "$answerer_name", helpfulness: "$helpful", photos: "$photos"}}}
//       }
//   },
//   {
//     $project: {
//       "_id": 1,
//       results: 1
//     }
//   },
//   {$out: {
//     db: "Question_Service",
//     coll: "correctanswers"
//   }}
// ],
// {allowDiskUse: true}).pretty()


// {
//   $project: {
//     "_id": 0,
//     "answers": {$arrayToObject: "$results"}
//   }
// }


// db.answers.aggregate(
//     [
//     {$sort: {id: 1}},
//     {
//       $lookup:
//         {
//           from: "answers_photos",
//           localField: "id",
//           foreignField: "answer_id",
//           as: "photos"
//         }
//     },
//     {
//       $group:
//         {
//           _id: "$question_id",
//           results: {$push: {answer_id: "$id", body: "$body", date: "$date_written", answerer_name: "$answerer_name", helpfulness: "$helpful", photos: "$photos"}}
//         }
//     },
//     {
//       $project: {
//       "_id": 0,
//       "results": 1,
//       "question": "$_id"
//       }
//     },
//     {$set: {"page": 0, "count": 5}},
//     {$out: {
//       db: "Question_Service",
//       coll: "exmapleanswers"
//     }}
//   ],
//   {allowDiskUse: true}).pretty()


// db.answers.aggregate(
//       [
//       {$sort: {id: -1}},
//       {$limit: 1}
//     ],
//     {allowDiskUse: true}).pretty()
