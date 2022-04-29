const Personnel = require('../models/Personnel')
const User = require('../models/user');
const Adopter = require('../models/Adopter')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary').v2;

// exports.getPersonnelProfile = async (req, res, next) => {
//     const personnel = await Personnel.findById(req.personnel.id);

//     console.log(personnel);
//     res.status(200).json({
//         success: true,
//         personnel
//     })
// }
exports.updateAdopter = catchAsyncErrors(async (req, res, next) => {
   const status = 'verified';
   const role = 'adopter';
   const mongoose = require('mongoose')

   const newAdopterData = {
        status: status
    }
    const newUserPersonnelData = {
        role: role
    }
    const adopter = await Adopter.findByIdAndUpdate(req.params.id, newAdopterData, {
        new: true,
        runValidators: true,        
    })
    let adopt = await Adopter.findById(req.params.id).populate('user', '_id').
        select('user')
    let useid = adopt.user;
    let id = mongoose.Types.ObjectId(useid);
    const userid = await User.findById(id.toString());
    const users = await User.findByIdAndUpdate(userid, newUserPersonnelData, {
        new: true,
        runValidators: true,      
    })
    res.status(200).json({
        success: true
    })
})

exports.updatesAdopter = catchAsyncErrors(async (req, res, next) => {
   const status = 'inactive';
   const mongoose = require('mongoose')

   const newAdopterData = {
        status: status
    }
    const newUserPersonnelData = {
        role: status
    }
    const adopter = await Adopter.findByIdAndUpdate(req.params.id, newAdopterData, {
        new: true,
        runValidators: true,        
    })
    let adopt = await Adopter.findById(req.params.id).populate('user', '_id').
        select('user')
    let useid = adopt.user;
    let id = mongoose.Types.ObjectId(useid);
    console.log(adopt)
    const userid = await User.findById(id.toString());
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
    console.log(userid) 
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

exports.getPersonnelAdopters = catchAsyncErrors(async (req, res, next) => {

    const adopters = await Adopter.find();

    res.status(200).json({
        success: true,
        adopters 
    })

})


exports.getSinglePersonnel = async(req,res,next) => {
	 const personnel = await Personnel.findById(req.params.id);
	 
	 if(! personnel) {
	 		return next(new ErrorHandler('Personnel not found',404));
	 }
	 res.status(200).json({
	 	success: true,
	 	 personnel
	 })
}

exports.getUserPersonnel = async(req,res,next) => {
   const mongoose = require('mongoose')
   //    const userid = await User.findOne().sort({ createdAt: -1 });
   //    var users = mongoose.Types.ObjectId(userid);
   //    const user = await User.findById({user: userid });
   //      console.log(user);
     // find({_id: mongoose.ObjectId(users)});


    let users = await User.find({role:'personnel'});
    let userid = await User.findOne().sort({ createdAt: -1 });
    let id = mongoose.Types.ObjectId(userid);


     const user = await User.findById(id.toString())

     // if(! users) {
     //        return next(new ErrorHandler('User not found',404));
     // }
     res.status(200).json({
        success: true,
         user
     })

}

exports.getAdminPersonnels = catchAsyncErrors(async (req, res, next) => {

    const personnels = await Personnel.find();

    res.status(200).json({
        success: true,
        personnels 
    })

})

exports.newPersonnelUser = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 1500,
        height: 1500,
        crop: "scale"
        });

    const { name, contact, email, password, category} = req.body;
    const role = 'personnel';
    
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

exports.newPersonnel = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 1500,
        height: 1500,
        crop: "scale"
        });

    const { name, contact, email, password, category} = req.body;
  
     const userid = await User.findOne().sort({ createdAt: -1 });
   
    const personnel = await Personnel.create({
        name,
        email,
        contact,
         category,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url       
        },
         user: userid
    })
    console.log(personnel)
     res.status(201).json({
        success: true,
        personnel
    })

})
// exports.newPersonnel = catchAsyncErrors(async (req, res, next) => {

//     const result = await cloudinary.uploader.upload(req.body.avatar, {
//         folder: 'avatars',
//         width: 150,
//         crop: "scale"
//         }, (err, res) => {
//           console.log(err, res);
//       });

//     const { name, contact, email, password, category} = req.body;
//     const role = 'personnel';
//      const userid = await User.findOne().sort({ createdAt: -1 });
//      if (name != null){
//          const user = await User.create({
//             name,
//             email,
//             password,
//             role,
//             avatar: {
//                 public_id: result.public_id,
//                 url: result.secure_url        
//             }

//         })  

//       res.status(201).json({
//         success: true,
//         user
//     })
//     }

//     const personnel = await Personnel.create({
//         name,
//         email,
//         contact,
//          category,
//         avatar: {
//             public_id: result.public_id,
//             url: result.secure_url       
//         },
//          user: userid
//     })
//     console.log(userid );
   
  
//      res.status(201).json({
//         success: true,
    
//         personnel
//     })

// })

exports.updatePersonnel = catchAsyncErrors(async (req, res, next) => {

   const newPersonnelData = {
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        category: req.body.category,
  
    }

    const newUserPersonnelData = {
        name: req.body.name,
        email: req.body.email,
    }

     if (req.body.avatar !== '') {
        const personnel = await Personnel.findById(req.params.id)
        const user = await User.findById(req.body.user)

        const images_id = user.avatar.public_id;
        const image_id = personnel.avatar.public_id;
        const des = await cloudinary.uploader.destroy(image_id);
        const troy = await cloudinary.uploader.destroy(images_id);

        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 1500,
            height: 1500,
            crop: "scale"
        })
 
        newPersonnelData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
        newUserPersonnelData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }

    }

     const personnel = await Personnel.findByIdAndUpdate(req.params.id, newPersonnelData, {
        new: true,
        runValidators: true,
        
    })

     const userid = await User.findById(req.body.user)
     const users = await User.findByIdAndUpdate(userid, newUserPersonnelData, {
        new: true,
        runValidators: true,
       
    })
    // console.log(users);
    res.status(200).json({
        success: true,
     
    })

})

exports.deletePersonnel = async (req,res,next) =>{
	const personnel = await Personnel.findById(req.params.id);

    const mongoose = require('mongoose')
    let person = await Personnel.findById(req.params.id).populate('user', '_id').
            select('user')
    let userid = person.user;
    let id = mongoose.Types.ObjectId(userid);
    const user = await User.findById(id.toString());
    // console.log(user);

    const image_id = user.avatar.public_id;
    const img_id = personnel.avatar.public_id;
    const des = await cloudinary.uploader.destroy(image_id);
    const troy = await cloudinary.uploader.destroy(img_id);

	if(!personnel) {
	 		return res.status(404).json({
	 			success: false,
	 			message: 'Personnel not found'
	 		})
	 }
	 await personnel.remove();
     await user.remove();
	 res.status(200).json({
	 	success: true,
	 	message: 'Personnel deleted'
	 })
}




