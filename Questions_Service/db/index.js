const mongoose = require('mongoose');
const mongoUri = 'mongodb://18.223.185.85 /Question_Service';

const connect = function () {
  mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('we are connected!')
  });

}

module.exports = connect;