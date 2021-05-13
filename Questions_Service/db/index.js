const mongoose = require('mongoose');
const mongoUri = 'mongodb://3.14.114.180/Question_Service';

const connect = function () {
  mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  });

}

module.exports = connect;