import { ALL_ANIMALS_REQUEST,
		 ALL_ANIMALS_SUCCESS, 
		 ALL_ANIMALS_FAIL,

		 ANIMAL_DETAILS_REQUEST,
		 ANIMAL_DETAILS_SUCCESS,
	     ANIMAL_DETAILS_FAIL,
         
         NEW_REVIEW_REQUEST,
         NEW_REVIEW_SUCCESS,
         NEW_REVIEW_RESET,
         NEW_REVIEW_FAIL,

         ADMIN_ANIMALS_REQUEST,
         ADMIN_ANIMALS_SUCCESS,
         ADMIN_ANIMALS_FAIL,

         NEW_ANIMAL_REQUEST,
         NEW_ANIMAL_SUCCESS,
         NEW_ANIMAL_RESET,
         NEW_ANIMAL_FAIL,

         DELETE_ANIMAL_REQUEST,
         DELETE_ANIMAL_SUCCESS,
         DELETE_ANIMAL_RESET,
         DELETE_ANIMAL_FAIL,

         UPDATE_ANIMAL_REQUEST,
         UPDATE_ANIMAL_SUCCESS,
         UPDATE_ANIMAL_RESET,
         UPDATE_ANIMAL_FAIL,


        GET_REVIEWS_REQUEST,
        GET_REVIEWS_SUCCESS,
        GET_REVIEWS_FAIL,

        DELETE_REVIEW_REQUEST,
        DELETE_REVIEW_SUCCESS,
        DELETE_REVIEW_RESET,
        DELETE_REVIEW_FAIL,


		 CLEAR_ERRORS 
		} from '../constants/animalConstants'


export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}     
export const newAnimalReducer = (state = { animal: {} }, action) => {
    switch (action.type) {

        case NEW_ANIMAL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ANIMAL_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                animal: action.payload.animal
            }

        case NEW_ANIMAL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ANIMAL_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const animalsReducer = (state = { animals: [] }, action) => {
	switch(action.type) {
		case ALL_ANIMALS_REQUEST:
        case ADMIN_ANIMALS_REQUEST:
			return {
				loading: true,
				animals: []
			}
		case ALL_ANIMALS_SUCCESS:
			return {
				loading:false,
				animals: action.payload.animals,
				animalsCount: action.payload.animalsCount,
				resPerPage: action.payload.resPerPage,
				filteredAnimalsCount: action.payload.filteredAnimalsCount
			}
		case ALL_ANIMALS_FAIL:
        case ADMIN_ANIMALS_FAIL:
			return {
				loading:false,
				error: action.payload
			}

        case ADMIN_ANIMALS_SUCCESS:
            return {
                loading: false,
                animals: action.payload
            }
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
}

export const animalDetailsReducer = (state = { animal: {} }, action) => {
    switch (action.type) {

        case ANIMAL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ANIMAL_DETAILS_SUCCESS:
            return {
                loading: false,
                animal: action.payload
            }

        case ANIMAL_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const animalReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ANIMAL_REQUEST:
        case UPDATE_ANIMAL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ANIMAL_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ANIMAL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_ANIMAL_FAIL:
        case UPDATE_ANIMAL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_ANIMAL_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_ANIMAL_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const animalReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

