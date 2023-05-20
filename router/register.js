const express = require('express');
const passport = require('passport');

const router = express.Router();
const registercontroller = require('../controller/registercontroller');

router.get('/',registercontroller.register);
router.post('/registerdata',registercontroller.registerinsert);
router.get('/login',registercontroller.login);
router.post('/logindata',passport.authenticate('local',{failureRedirect : '/register/login'}),registercontroller.logindata);
router.get('/logout',registercontroller.logout);

module.exports = router;