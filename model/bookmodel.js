const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const avatarpath = '/upload/user/bookimg';

const bookschema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    auther : {
        type : String,
        required: true
    },
    publisher : {
        type : Array,
        required: true,
    },
    category : {
        type : String,
        required : true
    },
    page : {
        type :Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required: true
    },
    date : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    }
});

let storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"..",avatarpath));
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+"-"+file.originalname);
        // console.log(file);
    }
});

bookschema.statics.upload = multer({storage : storage}).single('img');
bookschema.statics.avatarpath = avatarpath;

const book = mongoose.model('bookdata',bookschema);
module.exports = book;