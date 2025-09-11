const { default: mongoose } = require('mongoose');

const DBCONNECT = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log('database is connect');
    })
    .catch(err => {
      console.log('database not connect' + err.message);
    });
};

module.exports = DBCONNECT;
