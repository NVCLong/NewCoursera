const mongoose = require('mongoose');

async function connect() {
  try {
    mongoose
      .connect('mongodb://0.0.0.0:27017/coursera_dev')
      .then(() => console.log('Connected!'));
    console.log('Connect successfully');
  } catch (error) {
    console.log('Connect fail');
  }
}
async function handleConnect() {
  try {
    mongoose
      .connect('mongodb://0.0.0.0:27017/coursera_dev')
      .then(() => console.log('Connected!'));
    console.log('Connect successfully');
  } catch (error) {
    console.log('Connect fail');
  }
}
module.exports = {
  connect: connect,
  handleConnect: handleConnect,
};
