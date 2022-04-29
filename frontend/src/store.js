import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { animalsReducer, 
		 animalDetailsReducer, 
		 newAnimalReducer,
		 animalReducer,
		  newReviewReducer, 
		  reviewReducer,
		 animalReviewsReducer,
		} from './reducers/animalReducers'

import { injuriesReducer, 
		 injuryDetailsReducer, 
		 newInjuryReducer,
		 injuryReducer,
		} from './reducers/injuryReducers'
		
import { personnelsReducer, 
		 personnelDetailsReducer, 
		 newPersonnelReducer,
		 personnelReducer,
		 newPersonnelUserReducer,
		 userPersonnelDetailsReducer,
		 personnelAdoptersReducer,
		  personnelAdopterReducer,
		} from './reducers/personnelReducers'

import { adoptersReducer, 
		 adopterDetailsReducer, 
		 adopterReducer,
		 newAdopterReducer,
		 newAdopterUserReducer,
		 newAdoptReducer,
		 newAdoptUserReducer,
		} from './reducers/adopterReducers'

import { authReducer, 
		 userReducer,
		 forgotPasswordReducer,
		 allUsersReducer,
		 userDetailsReducer
		} from './reducers/userReducers'



const reducer = combineReducers({
	personnels :personnelsReducer,
	personnelDetails: personnelDetailsReducer,
	newPersonnel: newPersonnelReducer,
	personnel: personnelReducer,
	newPersonnelUser: newPersonnelUserReducer,
	userPersonnelDetails: userPersonnelDetailsReducer,
	personnelAdopters: personnelAdoptersReducer,
	personnelAdopter: personnelAdopterReducer,

	adopters: adoptersReducer,
	adopterDetails: adopterDetailsReducer,
	adopter: adopterReducer,
	newAdopter: newAdopterReducer,
	newAdopterUser: newAdopterUserReducer,
	newAdopt: newAdoptReducer,
	newAdoptUser: newAdoptUserReducer,

	injuries: injuriesReducer,
	injuryDetails: injuryDetailsReducer,
	newInjury: newInjuryReducer,
	injury: injuryReducer,

	animals: animalsReducer,
	animalDetails: animalDetailsReducer,
	newAnimal: newAnimalReducer,
	animal: animalReducer,
	newReview: newReviewReducer,
	animalReviews: animalReviewsReducer,
	review: reviewReducer,

	auth: authReducer,
	user: userReducer,
	forgotPassword: forgotPasswordReducer,
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,


})



const middlware = [thunk]
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlware)))

export default store;