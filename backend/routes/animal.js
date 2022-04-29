const express = require('express');
const router = express.Router();

const { getAnimals,
		getSingleAnimal,
		newAnimal, 
		updateAnimal, 
		deleteAnimal,
		createAnimalReview,
		getAnimalReviews,
		deleteReview,
		getAdminAnimals,
		
	} = require('../controllers/animalController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/animals').get(getAnimals);

router.route('/animal/:id').get(getSingleAnimal);
router.route('/admin/animal/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateAnimal).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAnimal);
router.route('/review').put(isAuthenticatedUser, createAnimalReview);
router.route('/reviews').get(isAuthenticatedUser, getAnimalReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

router.route('/admin/animals').get(getAdminAnimals);
router.route('/admin/animal/new').post(isAuthenticatedUser,authorizeRoles('admin'),newAnimal);
module.exports = router;

