const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connect = async () =>{
    // await mongoose.connect('mongodb://127.0.0.1:27017/chat-app');
    await mongoose.connect(process.env.MONGO_DB);
    
}

module.exports = connect; 