import { 
         ALL_ADOPTERS_REQUEST,
		 ALL_ADOPTERS_SUCCESS, 
		 ALL_ADOPTERS_FAIL,

		 ADOPTER_DETAILS_REQUEST,
		 ADOPTER_DETAILS_SUCCESS,
	     ADOPTER_DETAILS_FAIL,

         ADMIN_ADOPTERS_REQUEST,
         ADMIN_ADOPTERS_SUCCESS,
         ADMIN_ADOPTERS_FAIL,

         NEW_ADOPTER_REQUEST,
         NEW_ADOPTER_SUCCESS,
         NEW_ADOPTER_RESET,
         NEW_ADOPTER_FAIL,
         
         NEW_ADOPTERS_REQUEST,
         NEW_ADOPTERS_SUCCESS,
         NEW_ADOPTERS_RESET,
         NEW_ADOPTERS_FAIL,

         NEW_ADOPT_REQUEST,
         NEW_ADOPT_SUCCESS,
         NEW_ADOPT_RESET,
         NEW_ADOPT_FAIL,
         
         NEW_ADOPTS_REQUEST,
         NEW_ADOPTS_SUCCESS,
         NEW_ADOPTS_RESET,
         NEW_ADOPTS_FAIL,

         DELETE_ADOPTER_REQUEST,
         DELETE_ADOPTER_SUCCESS,
         DELETE_ADOPTER_RESET,
         DELETE_ADOPTER_FAIL,

         UPDATE_ADOPTER_REQUEST,
         UPDATE_ADOPTER_SUCCESS,
         UPDATE_ADOPTER_RESET,
         UPDATE_ADOPTER_FAIL,

		 CLEAR_ERRORS 
		} from '../constants/adopterConstants'

 
export const newAdopterReducer = (state = { adopter: {} }, action) => {
    switch (action.type) {

        case NEW_ADOPTER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ADOPTER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                adopter: action.payload.adopter
            }

        case NEW_ADOPTER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ADOPTER_RESET:
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

export const newAdopterUserReducer = (state = { adopteruser: {} }, action) => {
    switch (action.type) {

        case NEW_ADOPTERS_REQUEST:
            return {
                ...state,
                loadings: true
            }

        case NEW_ADOPTERS_SUCCESS:
            return {
                loadings: false,
                successs: action.payload.success,
                adopteruser: action.payload.adopteruser
            }

        case NEW_ADOPTERS_FAIL:
            return {
                ...state,
                errors: action.payload
            }

        case NEW_ADOPTERS_RESET:
            return {
                ...state,
                successs: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }

        default:
            return state
    }
}

export const newAdoptReducer = (state = { adopter: {} }, action) => {
    switch (action.type) {

        case NEW_ADOPT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ADOPT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                adopter: action.payload.adopter
            }

        case NEW_ADOPT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ADOPT_RESET:
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

export const newAdoptUserReducer = (state = { adopteruser: {} }, action) => {
    switch (action.type) {

        case NEW_ADOPTS_REQUEST:
            return {
                ...state,
                loadings: true
            }

        case NEW_ADOPTS_SUCCESS:
            return {
                loadings: false,
                successs: action.payload.success,
                adopteruser: action.payload.adopteruser
            }

        case NEW_ADOPTS_FAIL:
            return {
                ...state,
                errors: action.payload
            }

        case NEW_ADOPTS_RESET:
            return {
                ...state,
                successs: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }

        default:
            return state
    }
}

export const adoptersReducer = (state = { adopters: [] }, action) => {
	switch(action.type) {
		case ALL_ADOPTERS_REQUEST:
        case ADMIN_ADOPTERS_REQUEST:
			return {
				loading: true,
				adopters: []
			}
		case ALL_ADOPTERS_SUCCESS:
			return {
				loading:false,
				adopters: action.payload.adopters,
				adoptersCount: action.payload.adoptersCount,
				resPerPage: action.payload.resPerPage,
				filteredAdoptersCount: action.payload.filteredAdoptersCount
			}
		case ALL_ADOPTERS_FAIL:
        case ADMIN_ADOPTERS_FAIL:
			return {
				loading:false,
				error: action.payload
			}

        case ADMIN_ADOPTERS_SUCCESS:
            return {
                loading: false,
                adopters: action.payload
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

export const adopterDetailsReducer = (state = { adopter: {} }, action) => {
    switch (action.type) {

        case ADOPTER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADOPTER_DETAILS_SUCCESS:
            return {
                loading: false,
                adopter: action.payload
            }

        case ADOPTER_DETAILS_FAIL:
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

export const adopterReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ADOPTER_REQUEST:
        case UPDATE_ADOPTER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ADOPTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ADOPTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_ADOPTER_FAIL:
        case UPDATE_ADOPTER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_ADOPTER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_ADOPTER_RESET:
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


