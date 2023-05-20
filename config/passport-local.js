const passport = require('passport');
const localstrategy = require('passport-local').Strategy;

const registermodel = require('../model/registermodel');

passport.use(new localstrategy({
    usernameField : 'email'
},(email,password,done)=>{
    registermodel.findOne({email:email},(err,user)=>{
        if(err){
            return done(null,false);
        }   
        if(!user || user.password != password){
            console.log('not matched');
            return done(null,false);
        }
        return done(null,user);
    });
}));

passport.serializeUser(function(user,done){
    return done(null,user.id);
});

passport.deserializeUser(function(id,done){
    registermodel.findById(id,(err,data)=>{
        if(err){
            return done(null,false);
        }
        return done(null,data);
    })
});

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated());
        return next();
    }
    return res.redirect('/register/login');
}

passport.AuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        console.log("@@@"+req.isAuthenticated());
        res.locals.user = req.user
    }
    return next();
}

module.exports = passport;