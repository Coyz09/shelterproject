const express = require('express');
const router = express.Router();

const { getPersonnels,
		getSinglePersonnel,
		newPersonnel,
		newPersonnelUser,
		getUserPersonnel,
		getPersonnelProfile, 
		getPersonnelAdopters,
		updatePersonnel, 
		deletePersonnel,
		updateAdopter,
		updatesAdopter,  
		deleteAdopter,
		getAdminPersonnels,		
	} = require('../controllers/personnelController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/person/adopters').get(isAuthenticatedUser,authorizeRoles('admin','personnel'),getPersonnelAdopters);
// router.route('/personnel/me').get(isAuthenticatedUser, authorizeRoles('personnel'),getPersonnelProfile)
router.route('/personnel/:id').get(getSinglePersonnel);
router.route('/personnel/user/me').get(getUserPersonnel);

router.route('/person/adopter/:id').put(isAuthenticatedUser, authorizeRoles('admin','personnel'), updateAdopter).delete(isAuthenticatedUser, authorizeRoles('admin','personnel'), deleteAdopter);

router.route('/persons/adopter/:id').put(isAuthenticatedUser, authorizeRoles('admin','personnel'), updatesAdopter)

router.route('/admin/personnel/:id').put(isAuthenticatedUser, authorizeRoles('admin','personnel'), updatePersonnel).delete(isAuthenticatedUser, authorizeRoles('admin','personnel'), deletePersonnel);

router.route('/admin/personnels').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminPersonnels);
router.route('/admin/personnel/new').post(isAuthenticatedUser,authorizeRoles('admin'),newPersonnel);
router.route('/admin/personnel/register').post(isAuthenticatedUser,authorizeRoles('admin'),newPersonnelUser);
module.exports = router;

