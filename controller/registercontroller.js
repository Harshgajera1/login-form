const register = require('../model/registermodel');

module.exports.register = (req,res)=>{
    // if(!req.cookies.UserId){
    //     return res.redirect('/register/login');
    // }
    return res.render('register');
}

module.exports.registerinsert = (req,res)=>{
    // console.log(req.body);
    if(req.body.password==req.body.cpassword){
        register.create(req.body,(err,data)=>{
            if(err){
                console.log('register insert error');
                return false;
            }
            // console.log(data);
            return res.redirect('/');
        });
    }
    else{
        return res.redirect('back');
    }
}

module.exports.login = (req,res)=>{
    // if(req.cookies.UserId){
    //     return res.redirect('/');
    // }
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('login');
}

module.exports.logindata = (req,res)=>{
    // console.log(req.body);
    return res.redirect('/');
    // register.findOne({email : req.body.email},(err,data)=>{
    //     if(err){
    //         console.log('error logindata');
    //         return false;
    //     }
    //     // console.log(data);
    //     if(data){
    //         if(req.body.password == data.password){
    //             // res.cookie('UserId',data.id);
    //             return res.redirect('/');
    //         }
    //         else{
    //             return res.redirect('back');
    //         }
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // });
}

module.exports.logout= (req,res)=>{
    // res.cookie('UserId','');
    // req.logout(function(err){
    //     if(err){
    //         console.log('error session');
    //         return false;
    //     }
    //     return res.redirect('/register/login');
    // });
    req.session.destroy((err)=>{
        if(err){
            console.log('session error');
            return false;
        }
        return res.redirect('/register/login');
    });
}