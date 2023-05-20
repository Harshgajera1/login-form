const passport = require('passport');

const passportlocal = require('passport-local').Strategy;

const registermodel = require('../model/registermodel');

passport.use(new passportlocal({
    usernameField : 'email'
}, function(email,password,done){
    registermodel.findOne({email : email}, function(err,users){
        if(err){
            console.log('email not found');
            return done(err);
        }
        if(!users || users.password != password){
            console.log('record not found or password not match.');
            return done(null,false);
        }       
        console.log(users);
        return done(null,users);
    })
}))

passport.serializeUser(function(users,done){
    return done(null,users.id);
});

passport.deserializeUser(function(id,done){
    registermodel.findById(id,function(err,users){
        if(err){
            return done(null,false);
        }
        console.log(users);
        return done(null,users);
    });
});

// module.exports = passport;