const Injury = require('../models/injury')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


exports.getSingleInjury = async(req,res,next) => {
	 const injury = await Injury.findById(req.params.id);
	 
	 if(!injury) {
	 		return next(new ErrorHandler('Injury not found',404));
	 }
	 res.status(200).json({
	 	success: true,
	 	injury
	 })
}
exports.getAdminInjuries = catchAsyncErrors(async (req, res, next) => {

    const injuries = await Injury.find();

    res.status(200).json({
        success: true,
        injuries 
    })

})

exports.newInjury = catchAsyncErrors(async (req, res, next) => {


    const injury = await Injury.create(req.body);

    res.status(201).json({
        success: true,
        injury
    })
})

exports.updateInjury = catchAsyncErrors(async (req, res, next) => {

    let injury = await Injury.findById(req.params.id);

    if (!injury) {
        return next(new ErrorHandler('Injury not found', 404));
    }

    injury = await Injury.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        injury
    })

})
exports.deleteInjury = async (req,res,next) =>{
	const injury = await Injury.findById(req.params.id);
	if(!injury) {
	 		return res.status(404).json({
	 			success: false,
	 			message: 'Injury not found'
	 		})
	 }
	 await injury.remove();
	 res.status(200).json({
	 	success: true,
	 	message: 'Injury deleted'
	 })
}




