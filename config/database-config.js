const mongoose = require('mongoose');

const connectDb = async () =>{
    await mongoose.connect('mongodb://localhost/chat-app');
    console.log('start')
}

module.exports = connectDb;