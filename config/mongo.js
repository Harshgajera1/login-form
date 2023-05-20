require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on('error',console.error.bind(console,'db on error'));
db.once('open',(err)=>{
    if(err){
        console.log('MongoDB Disconnected');
        return false
    }
    console.log('MongoDB Connected');
});
module.exports = db;