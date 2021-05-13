const express = require('express');
const mongoose = require('mongoose');
const connect = require('../db/index.js');
// const findAnswer = require('../schemas/answersSchema.js');
const bodyParser = require('body-parser');
const question = require('./controllers/question.js');



const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())

connect();

// app.use(express.static(__dirname + '/../react-client/dist'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);

});

app.get('/qa/questions', (req, res) => {
  var id = req.query.product_id;
  question.findQuestions(id, (error, results) => {
    if(error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  var id = req.params.question_id;
  question.findAnswers(id, (error, results) => {
    if(error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
})


app.post('/qa/questions', (req, res) => {

  var params = req.body;

  findQuestion.postQuestionByProductId(params.product_id, params.body, params.name, params.photos, (error, results) => {
    if(error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
})


app.post('/qa/questions/:question_id/answers', (req, res) => {
  var params = req.params;
  var body = req.body
  question.postAnswer(params, body, (error, results) => {
    if(error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  const id = req.params.question_id;
  question.reportQuestion(id, (error, results) => {
    if(error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const id = req.params.question_id;
  question.markHelpful(id, (error, results) => {
    if(error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const id = req.params.answer_id;
  question.markAnswerHelpful(id, (error, results) => {
    if(error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  const id = req.params.answer_id;
  question.reportAnswer(id, (error, results) => {
    if(error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
})



