const Adopter = require('../models/Adopter')
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary').v2;

exports.getAdopterProfile = async (req, res, next) => {
    const adopter = await Adopter.findById(req.adopter.id);

    res.status(200).json({
        success: true,
        adopter
    })
}

exports.getSingleAdopter = async(req,res,next) => {
	 const adopter = await Adopter.findById(req.params.id);
	 
	 if(!adopter) {
	 		return next(new ErrorHandler('Adopter not found',404));
	 }
	 res.status(200).json({
	 	success: true,
	 	 adopter
	 })
}



exports.getAdminAdopters = catchAsyncErrors(async (req, res, next) => {

    const adopters = await Adopter.find();

    res.status(200).json({
        success: true,
        adopters 
    })

})

exports.getUserAdopter = async(req,res,next) => {
   const mongoose = require('mongoose')

    let users = await User.find({role:'unverified'});
     let userid = await User.findOne().sort({ createdAt: -1 });
    let id = mongoose.Types.ObjectId(userid);

     const user = await User.findById(id.toString())
    // console.log(user);

     res.status(200).json({
        success: true,
         user
     })

}


exports.newAdopterUser = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 1500,
        height: 1500,
        crop: "scale"
        });

    const { name, contact, address, email, password} = req.body;
    const role = 'adopter';
    
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

      res.status(201).json({
        success: true,
        user
    })

})

exports.newAdopter = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 1500,
        height: 1500,
        crop: "scale"
        });

    const { name, contact, address, email, password} = req.body;
  
     const userid = await User.findOne().sort({ createdAt: -1 });
    const status = 'verified';
    
    const adopter = await Adopter.create({
        name,
        contact,
        address,
        email,
        status: status,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url       
        },
         user: userid
    })
    console.log(adopter)
     res.status(201).json({
        success: true,
        adopter
    })

})


exports.newAdoptUser = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 1500,
        height: 1500,
        crop: "scale"
        });

    const { name, contact, address, email, password} = req.body;
    const role = 'unverified';
    
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

      res.status(201).json({
        success: true,
        user
    })
})

exports.newAdopt = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 1500,
        height: 1500,
        crop: "scale"
        });

    const { name, contact, address, email, password} = req.body;
  
    const userid = await User.findOne().sort({ createdAt: -1 });
    const status = 'unverified';
    const adopter = await Adopter.create({
        name,
        contact,
        address,
        email,
        status : status,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url       
        },
         user: userid
    })
    console.log(adopter)
     res.status(201).json({
        success: true,
        adopter
    })

})



exports.updateAdopter = catchAsyncErrors(async (req, res, next) => {

   const newAdopterData = {
        name: req.body.name,
        contact: req.body.contact,
        address: req.body.address,
        email: req.body.email,
    }

    const newUserPersonnelData = {
        name: req.body.name,
        email: req.body.email,
    }

     if (req.body.avatar !== '') {
        const adopter = await Adopter.findById(req.params.id)
        const user = await User.findById(req.body.user)
       
        const images_id = user.avatar.public_id;
        const image_id = adopter.avatar.public_id;
        const des = await cloudinary.uploader.destroy(image_id);
        const troy = await cloudinary.uploader.destroy(images_id);
        // console.log(images_id);

        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 1500,
            height: 1500,
            crop: "scale"
        })
  
        newAdopterData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }

         newUserPersonnelData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }

    }

    const adopter = await Adopter.findByIdAndUpdate(req.params.id, newAdopterData, {
        new: true,
        runValidators: true,
        
    })

     const userid = await User.findById(req.body.user)
     const users = await User.findByIdAndUpdate(userid, newUserPersonnelData, {
        new: true,
        runValidators: true,
       
    })

    res.status(200).json({
        success: true
    })

})


exports.deleteAdopter = async (req,res,next) =>{
    
	const adopter = await Adopter.findById(req.params.id);

    const mongoose = require('mongoose')
    let adopt = await Adopter.findById(req.params.id).populate('user', '_id').
        select('user')
    let userid = adopt.user;
    let id = mongoose.Types.ObjectId(userid);

    const user = await User.findById(id.toString());

    const image_id = user.avatar.public_id;
    const img_id = adopter.avatar.public_id;
    const des = await cloudinary.uploader.destroy(image_id);
    const troy = await cloudinary.uploader.destroy(img_id);

	if(!adopter) {
	 		return res.status(404).json({
	 			success: false,
	 			message: 'Adopter not found'
	 		})
	 }

	 await adopter.remove();
     await user.remove();
	 res.status(200).json({
	 	success: true,
	 	message: 'Adopter deleted'
	 })
}




