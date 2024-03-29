const User = require('../models/user');
const Personnel = require('../models/personnel')
const Adopter = require('../models/adopter')
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    
    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    }, (err, res) => {
          console.log(err, res);
      });
    console.log(result);
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
           
        }
    })

    sendToken(user, 200, res)

})

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const status = 'inactive';

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({ email }).select('+password')
    const use = await User.findOne({ email }).select('+password role')
    let userole = use.role;
    // Finding user in database
    console.log(userole)

    if (userole === status) {
        return next(new ErrorHandler('Inactive user, Please Contact Admin!', 401));
    }

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
 
    sendToken(user, 200, res)
}

exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}

exports.forgotPassword = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `<p>Your password reset token is as follow:\n\n<a href="${resetUrl}">Reset Password</a>\n\nIf you have not requested this email, then ignore it.</p>`
    const html =  `<p>Your password reset token is as follow:\n\n<a href="${resetUrl}">Reset Password</a>\n\nIf you have not requested this email, then ignore it.</p>`
    try {

        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message,
            html
             
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }

}

// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

}

exports.getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })

}

exports.getPersonnelProfile = async (req, res, next) => {

     const mongoose = require('mongoose')

    const user = await User.findById(req.user.id);
    let id = mongoose.Types.ObjectId(user);

    const personnel = await Personnel.find({user:id.toString()});
    console.log(personnel);
    res.status(200).json({
        success: true,
      personnel
    })
}

exports.getAdminProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    console.log(user);
    res.status(200).json({
        success: true,
        user
    })
}



// exports.getPersonnelProfile = async (req, res, next) => {
//     const mongoose = require('mongoose')

//     const userid = await User.findById(req.user.id);
//     // let id = mongoose.Types.ObjectId(userid);

//     // const personnel = await Personnel.find({user:id.toString()});
//     // console.log(personnel);
//     res.status(200).json({
//         success: true,
//        userid
//     })
// }

exports.updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

}

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = async (req, res, next) => {
    const status = 'unverified';
    const use = await User.findById(req.user.id).select('role')
    let userole = use.role;
    console.log(userole)

   

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.uploader.destroy(image_id);
    
        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        // useFindAndModify: false
    })
    
     if (userole === status) {
        return next(new ErrorHandler('Unverified user, Please Contact Admin!', 401));
    }
    
    res.status(200).json({
        success: true
    })
}

exports.updateAdminProfile = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.uploader.destroy(image_id);
    
        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        // useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
}


// Get all users   =>   /api/v1/admin/users
exports.allUsers = async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
}

// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
}


// Get update user details   =>   /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

     if (req.body.avatar !== '') {
        const user = await User.findById(req.params.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.uploader.destroy(image_id);
       
        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })
  
        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        
    })

    res.status(200).json({
        success: true
    })
})

// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    const mongoose = require('mongoose')
    let adopt = user.role;
    let person = user.role;

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    if(adopt == "adopter") {
        let adopterid = mongoose.Types.ObjectId(user);   
        let adopter = await Adopter.findOne({user:adopterid.toString()});
        const image_id = user.avatar.public_id;
        const img_id = adopter.avatar.public_id;
        const res = await cloudinary.uploader.destroy(image_id);
        const peso = await cloudinary.uploader.destroy(img_id);
        
        await user.remove()
        await adopter.remove();
    }

    if(person == "personnel") {
         
       let personid = mongoose.Types.ObjectId(user); 
       let personnel = await Personnel.findOne({user:personid.toString()});
        const image_id = user.avatar.public_id;
        const img_id = personnel.avatar.public_id;
        const res = await cloudinary.uploader.destroy(image_id);
        const peso = await cloudinary.uploader.destroy(img_id);

        await user.remove()
        await personnel.remove();
    }
    else{
         await user.remove()
    }

    res.status(200).json({
        success: true,
    })
    
})

