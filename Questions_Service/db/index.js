const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/Question_Service';

const connect = function () {
  mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('we are connected!')
  });

}

module.exports = connect;