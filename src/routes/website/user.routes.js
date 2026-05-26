const express = require('express');
const multer  = require('multer');
const { register, login, changePassword, forgotPassword, resetPassword} = require('../../controllers/website/user.controller');
const upload = multer({ dest: 'uploads/users' });



var router = express.Router();

 module.exports = server => {

       router.post('/register', upload.none(),register);
       router.post('/login', upload.none(),login);
       router.put('/change-password', upload.none(),changePassword);
       router.post('/forgot-password', upload.none(),forgotPassword);
       router.post('/reset-password',upload.none(), resetPassword);

     server.use('/api/website/users',router);
}