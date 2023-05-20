require('dotenv').config()
const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const path = require('path');
const app = express();
const db  =require('./config/mongo');

const PORT = process.env.PORT


const localstrategy =  require('./config/passport-local');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(cookieParser());

app.use(session({
    name : 'ID',
    secret : 'id',
    saveUninitialized : false,
    resave : false,
    cookie : {maxAge : 1000*60*60}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.AuthenticatedUser);

app.set('views',path.join(__dirname,'views'));
app.use('/upload',express.static(path.join(__dirname,'/upload')));

app.use('/',require('./router/router'));

app.listen(PORT,(err)=>{
    if(err){
        console.log('error server');
        return false;
    }
    console.log(`server start port no : ${PORT}`);
});