
const userModel = require("../../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


// var slugify = require('slugify')

const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};

exports.register = async(request,response) => {
        checkEmail = await userModel.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type: 'user'
    })

    // if(checkEmail){
    //     const data = {
    //         _status : false,
    //         _message : 'Email Id already exit !!',
    //         _data : null
    //     }

    //     response.send(data)
    // }

    dataSave = request.body;
    console.log(dataSave);
    dataSave.role_type = 'user';
    dataSave.password = await bcrypt.hash(request.body.password, saltRounds);

    userModel(dataSave).save()
    .then((result) => {

    console.log(process.env.secret_key)

        token = jwt.sign({ userInfo : result } , process.env.secret_key);

        const data = {
            _status : true,
            _message : 'Register user successfully !',
            _token : token,
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : error.message,
            _data : null
        }

        response.send(data)
    });

}

exports.login = async (request, response) => {
    checkEmail = await userModel.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(!checkEmail){
        const data = {
            _status : false,
            _message : 'Email Id doest not exit !!',
            _registerstatus : true ,
            _data : null
        }

        response.send(data)
    }

    var checkPassword = await bcrypt.compare(request.body.password, checkEmail.password);
    
    if(!checkPassword){
        const data = {
            _status : false,
            _message : 'Password is incorrect !!',
            _data : null
        }

        response.send(data)
    }

    if(checkEmail.status == 0){
        const data = {
            _status : false,
            _message : 'Your account is deactivated. Please contact support !!',
            _data : null
        }

        response.send(data)
    }

    token = jwt.sign({ userInfo : checkEmail } , process.env.secret_key);

    const data = {
        _status : true,
        _message : 'Login successfully !',
        _token : token,
        _data : checkEmail
    }

    response.send(data)
};

exports.changePassword = async(request, response) => {

    var token = request.headers.authorization.split(' ');
    var decoded = jwt.verify(token[1], process.env.secret_key);

    userInfo = await userModel.findOne({
        _id: decoded.userInfo._id, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(!userInfo){
        const data = {
            _status : false,
            _message : 'User doest not exit !!',
            _data : null
        }

        response.send(data)
    }

    // console.log(request.body.current_password ,userInfo.password )

    var checkPassword = await bcrypt.compare(request.body.current_password, userInfo.password);
    console.log("cehck password ",checkPassword)
    if(!checkPassword){
        const data = {
            _status : false,
            _message : 'Password is incorrect !!',
            _data : null
        }

        response.send(data)
    }

    if(request.body.new_password == request.body.current_password){
        const data = {
            _status : false,
            _message : 'New Password and current password cannot be same !!',
            _data : null
        }

        response.send(data)
    }

    if(request.body.new_password != request.body.confirm_password){
        const data = {
            _status : false,
            _message : 'New Password and confirm password must be same !!',
            _data : null
        }

        response.send(data)
    }

    var password = await bcrypt.hash(request.body.confirm_password, saltRounds);

    await userModel.updateOne({
        _id : decoded.userInfo._id
    }, {
        $set : {
            password : password
        }
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Change Password successfully !!',
            _data : result
        }

        response.send(data)
    })
    .catch((error) => {
        var errorMessages = {};
        for( var i in error.errors){
            errorMessages[i] = error.errors[i].message;
        }

        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _error : errorMessages,
            _data : null
        }

        response.send(data)
    })
};

exports.forgotPassword = async(request, response) => {
     userInfo = await userModel.findOne({
        email: request.body.email, 
        deleted_at : null, 
        role_type: 'user'
    })

    if(!userInfo){
        const data = {
            _status : false,
            _message : 'Incorrect email id !!',
            _data : null
        }

        response.send(data)
    }

    const resetToken = jwt.sign({ email: userInfo.email }, process.env.secret_key, { expiresIn: '1h' });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.email,
            pass: process.env.password,
        },
    });

    const mailOptions = {
        from: `${process.env.APP_NAME || 'Upstare Research'} <${process.env.email}>`,
        to: userInfo.email,
        subject: "Password reset request",
        html: `
            <p>Hi ${userInfo.name || ''},</p>
            <p>We received a request to reset your password. Click the link below to reset it. This link is valid for 1 hour.</p>
            <p><a href="${resetLink}">Reset your password</a></p>
            <p>If you didn't request this, please ignore this email.</p>
        `
    };

    await transporter.sendMail(mailOptions)
    .then(() => {
        const data = {
            _status : true,
            _message : 'Password reset link sent to your email.',
            _data : null
        }

        response.send(data)
    })
    .catch((error) => {
        const data = {
            _status : false,
            _message : 'Something went wrong while sending email.',
            _error : error,
            _data : null
        }

        response.send(data)
    })
}

exports.resetPassword = async (request, response) => {
    const { token, new_password, confirm_password } = request.body;

    if(!token){
        return response.send({ _status: false, _message: 'Token is required', _data: null });
    }

    if(!new_password || !confirm_password){
        return response.send({ _status: false, _message: 'Password and confirm password are required', _data: null });
    }

    if(new_password !== confirm_password){
        return response.send({ _status: false, _message: 'New password and confirm password must match', _data: null });
    }

    let decoded;
    try{
        decoded = jwt.verify(token, process.env.secret_key);
    } catch(err){
        return response.send({ _status: false, _message: 'Invalid or expired token', _data: null });
    }

    const email = decoded.email;

    const userInfo = await userModel.findOne({ email: email, deleted_at: null, role_type: 'user' });

    if(!userInfo){
        return response.send({ _status: false, _message: 'User not found', _data: null });
    }

    const hashed = await bcrypt.hash(new_password, saltRounds);

    await userModel.updateOne({ _id: userInfo._id }, { $set: { password: hashed } })
    .then(() => {
        return response.send({ _status: true, _message: 'Password reset successfully', _data: null });
    })
    .catch((error) => {
        return response.send({ _status: false, _message: 'Something went wrong', _error: error, _data: null });
    })
}
