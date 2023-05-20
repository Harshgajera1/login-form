const express = require('express');
const { route } = require('express/lib/application');
const passport = require('passport');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/',passport.checkAuthentication,controller.start);
router.post('/insertdata',controller.insert);
router.get('/showdata',passport.checkAuthentication,controller.show);
router.get('/deletedata/:id',controller.deletedata);
router.get('/updatedata',controller.update)
router.post('/editdata',controller.edit);
router.use('/register',require('./register'));




module.exports = router;