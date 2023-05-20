const book = require('../model/bookmodel');
const fs = require('fs');
const path = require('path');
const { findById } = require('../model/bookmodel');

let start = (req,res)=>{
    // if(!req.cookies.UserId){
    //     return res.redirect('/register/login');
    // }
    return res.render('home');
}   

let insert = (req,res)=>{
    // console.log(req.body);
    // console.log(req.file);

    book.upload(req,res,(err)=>{
        if(err){
            console.log('error upload insert');
            return false;
        }
        // console.log(req.body);
        // console.log(req.file);
        if(req.file){
            var avatar = book.avatarpath+"/"+req.file.filename;
            // console.log(avatar);
        }
        book.create({
            name : req.body.name,
            auther : req.body.auther,
            publisher : req.body.publisher,
            category : req.body.category,
            page : req.body.page,
            description : req.body.description,
            avatar : avatar,
            date : req.body.date,
            rating : req.body.rating
        },(err,data)=>{
                if(err){
                    console.log('error insert');
                    return false;
                }
                // console.log(data);      
                return res.redirect('back');
        })
    });
}


let show = (req,res)=>{
    // console.log(req.cookies);
    // if(!req.cookies.UserId){
    //     return res.redirect('/register/login');
    // }
    book.find({},(err,data)=>{
        if(err){
            console.log('show data error');
            return false;
        }
        return res.render('show',{ title: 'This is Show Page.', data : data });
    });
}

let deletedata = (req,res)=>{
    // console.log(req.params.id);
    // if(!req.cookies.UserId){
    //     return res.redirect('/register/login');
    // }
    book.findById(req.params.id,(err,data)=>{
        if(err){
            console.log('error delete');
            return false;
        }
        // console.log(data);
        if(data.avatar){
            fs.unlinkSync(path.join(__dirname,'..',data.avatar));
        }
        book.findByIdAndDelete(req.params.id,(err,data)=>{
            if(err){
                console.log('error delete');
                return false;
            }
            // console.log(data);
            return res.redirect('back');
        })
    })

    // book.findByIdAndDelete(req.params.id,(err,data)=>{
    //     if(err){
    //         console.log('error delete');
    //         return false;
    //     }
    //     return res.redirect('back');
    // });
}

let update = (req,res)=>{
    // console.log(req.query.id);
    book.findById(req.query.id,(err,data)=>{
        if(err){
            console.log('error update');
            return false;
        }
        // console.log(data);
        return res.render('update',{title : 'This is Update Page', data : data});
    }); 
}

let edit = (req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    book.upload(req,res,(err)=>{
        if(err){
            console.log('error edit');
            return false;
        }
        // console.log(req.body);
        // console.log(req.file);
        if(req.file){
            book.findById(req.body.id,(err,data)=>{
                if(err){
                    console.log('error edit if');  
                    return false;
                }
                // console.log(data.avatar);
                if(data.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',data.avatar));
                }
                // console.log(req.file);
                var avatar = book.avatarpath+"/"+req.file.filename;
                // console.log(avatar);
                // console.log(req.body);
                book.findByIdAndUpdate(req.body.id,{
                    name : req.body.name,
                    auther  :req.body.auther,
                    publisher : req.body.publisher,
                    category : req.body.category,
                    page : req.body.page,
                    description : req.body.description,
                    avatar : avatar,
                    date : req.body.date,
                    rating :req.body.rating
                },(err,data)=>{
                    if(err){
                        console.log('error edit');
                        return false;
                    }
                    return res.redirect('/showdata');
                });
            });
        }
        else{
            // console.log(req.body);
            book.findById(req.body.id,(err,data)=>{
                if(err){
                    console.log('error edit data');
                    return false;
                }
                // console.log(data);
                var avatar = data.avatar;
                // console.log(avatar);
                // console.log(req.body);
                book.findByIdAndUpdate(req.body.id,{
                    name : req.body.name,
                    auther : req.body.auther,
                    publisher : req.body.publisher,
                    category : req.body.category,
                    page : req.body.page,
                    description : req.body.description,
                    avatar : avatar,
                    date : req.body.date,
                    rating : req.body.rating
                },(err,data)=>{
                    if(err){
                        console.log('error edit else');
                        return false;
                    }
                    return res.redirect('/showdata');
                });
            })
        }
    });
}

module.exports= {start, insert , show, deletedata, update, edit};