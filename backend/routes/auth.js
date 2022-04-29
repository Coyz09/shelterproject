const express = require('express');
const router = express.Router();

const { registerUser,
		loginUser,
		logout,
		forgotPassword,
		resetPassword,
		getUserProfile,
		getAdminProfile,
		getPersonnelProfile,
		updatePassword,
		updateProfile,
		updateAdminProfile,
		allUsers,
		getUserDetails,
		updateUser,
	    deleteUser,
	     } = require('../controllers/authController');


 const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/me/personnel').get(isAuthenticatedUser, authorizeRoles('personnel'),getPersonnelProfile)
router.route('/admin/me').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProfile)
router.route('/admin/me/update').get(isAuthenticatedUser, authorizeRoles('admin'), updateAdminProfile)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)


router.route('/logout').get(logout);

module.exports = router;