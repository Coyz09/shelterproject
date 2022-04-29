const express = require('express');
const router = express.Router();

const { getAdopters,
		getSingleAdopter,
		newAdopter,
		newAdopterUser,
		newAdopt,
		newAdoptUser,
		getUserAdopter,
		getAdopterProfile, 
		updateAdopter, 
		deleteAdopter,
		getAdminAdopters,		
	} = require('../controllers/adopterController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// router.route('/personnel/me').get(isAuthenticatedUser, authorizeRoles('personnel'),getPersonnelProfile)
router.route('/adopter/:id').get(getSingleAdopter);
router.route('/adopter/user/me').get(getUserAdopter);
router.route('/admin/adopter/:id').put(isAuthenticatedUser, authorizeRoles('admin','adopter', 'personnel'), updateAdopter).delete(isAuthenticatedUser, authorizeRoles('admin','adopter', 'personnel'), deleteAdopter);

router.route('/admin/adopters').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminAdopters);
router.route('/admin/adopter/new').post(isAuthenticatedUser,authorizeRoles('admin'),newAdopter);
router.route('/admin/adopter/register').post(isAuthenticatedUser,authorizeRoles('admin'),newAdopterUser);

router.route('/adopter/new').post(newAdopt);
router.route('/adopter/register').post(newAdoptUser);

module.exports = router;

