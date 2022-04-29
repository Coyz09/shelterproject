const express = require('express');
const router = express.Router();

const { getInjuries,
		getSingleInjury,
		newInjury, 
		updateInjury, 
		deleteInjury,
		getAdminInjuries,
		
	} = require('../controllers/injuryController');
// getInjuries, getSingleInjury, 
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// router.route('/injuries').get(getInjuries);

router.route('/injury/:id').get(getSingleInjury);
router.route('/admin/injury/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateInjury).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteInjury);

router.route('/admin/injuries').get(getAdminInjuries);
router.route('/admin/injury/new').post(isAuthenticatedUser,authorizeRoles('admin'),newInjury);
module.exports = router;

