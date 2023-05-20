const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/demobok');
const db = mongoose.connection;

db.on('error',console.error.bind(console,'db on error'));
db.once('open',(err)=>{
    if(err){
        console.log('db error');
        return false
    }
    console.log('db is on.');
});
module.exports = db;