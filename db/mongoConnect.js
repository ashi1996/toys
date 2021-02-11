const mongoose = require('mongoose');
const {config} = require('../config/secretData');
// panda3 -> מיצג את השם של המסד נתונים
mongoose.connect(`mongodb+srv://${config.mongoUser}:${config.mongoPass}@cluster0.rxaod.mongodb.net/myData`, {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("mongo connect");
  // we're connected!
});

module.exports = db;