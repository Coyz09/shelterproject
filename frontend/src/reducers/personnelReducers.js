import { ALL_PERSONNELS_REQUEST,
		 ALL_PERSONNELS_SUCCESS, 
		 ALL_PERSONNELS_FAIL,
		 PERSONNEL_DETAILS_REQUEST,
		 PERSONNEL_DETAILS_SUCCESS,
	     PERSONNEL_DETAILS_FAIL,

         PERSONNEL_ADOPTERS_REQUEST,
         PERSONNEL_ADOPTERS_SUCCESS,
         PERSONNEL_ADOPTERS_FAIL,

         ADMIN_PERSONNELS_REQUEST,
         ADMIN_PERSONNELS_SUCCESS,
         ADMIN_PERSONNELS_FAIL,

         NEW_PERSONNEL_REQUEST,
         NEW_PERSONNEL_SUCCESS,
         NEW_PERSONNEL_RESET,
         NEW_PERSONNEL_FAIL,
         
         NEW_PERSONNELS_REQUEST,
         NEW_PERSONNELS_SUCCESS,
         NEW_PERSONNELS_RESET,
         NEW_PERSONNELS_FAIL,

         DELETE_PERSONNEL_REQUEST,
         DELETE_PERSONNEL_SUCCESS,
         DELETE_PERSONNEL_RESET,
         DELETE_PERSONNEL_FAIL,

         UPDATE_PERSONNEL_REQUEST,
         UPDATE_PERSONNEL_SUCCESS,
         UPDATE_PERSONNEL_RESET,
         UPDATE_PERSONNEL_FAIL,

         USER_DETAIL_REQUEST,
         USER_DETAIL_SUCCESS,
         USER_DETAIL_FAIL,

         DELETE_ADOPTER_REQUEST,
         DELETE_ADOPTER_SUCCESS,
         DELETE_ADOPTER_RESET,
         DELETE_ADOPTER_FAIL,

         UPDATE_ADOPTER_REQUEST,
         UPDATE_ADOPTER_SUCCESS,
         UPDATE_ADOPTER_RESET,
         UPDATE_ADOPTER_FAIL,

		 CLEAR_ERRORS 
		} from '../constants/personnelConstants'

export const personnelAdoptersReducer = (state = { adopters: [] }, action) => {
    switch(action.type) {

        case PERSONNEL_ADOPTERS_REQUEST:
            return {
                loading: true,
                adopters: []
            }

        case PERSONNEL_ADOPTERS_FAIL:
            return {
                loading:false,
                error: action.payload
            }

        case PERSONNEL_ADOPTERS_SUCCESS:
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


export const personnelAdopterReducer = (state = {}, action) => {
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



 
export const newPersonnelReducer = (state = { personnel: {} }, action) => {
    switch (action.type) {

        case NEW_PERSONNEL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PERSONNEL_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                personnel: action.payload.personnel
            }

        case NEW_PERSONNEL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_PERSONNEL_RESET:
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

export const newPersonnelUserReducer = (state = { personneluser: {} }, action) => {
    switch (action.type) {

        case NEW_PERSONNELS_REQUEST:
            return {
                ...state,
                loadings: true
            }

        case NEW_PERSONNELS_SUCCESS:
            return {
                loadings: false,
                successs: action.payload.success,
                personneluser: action.payload.personneluser
            }

        case NEW_PERSONNELS_FAIL:
            return {
                ...state,
                errors: action.payload
            }

        case NEW_PERSONNELS_RESET:
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

export const personnelsReducer = (state = { personnels: [] }, action) => {
	switch(action.type) {
		case ALL_PERSONNELS_REQUEST:
        case ADMIN_PERSONNELS_REQUEST:
			return {
				loading: true,
				personnels: []
			}
		case ALL_PERSONNELS_SUCCESS:
			return {
				loading:false,
				personnels: action.payload.personnels,
				personnelsCount: action.payload.personnelsCount,
				resPerPage: action.payload.resPerPage,
				filteredPersonnelsCount: action.payload.filteredPersonnelsCount
			}
		case ALL_PERSONNELS_FAIL:
        case ADMIN_PERSONNELS_FAIL:
			return {
				loading:false,
				error: action.payload
			}

        case ADMIN_PERSONNELS_SUCCESS:
            return {
                loading: false,
                personnels: action.payload
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

export const personnelDetailsReducer = (state = { personnel: {} }, action) => {
    switch (action.type) {

        case PERSONNEL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PERSONNEL_DETAILS_SUCCESS:
            return {
                loading: false,
                personnel: action.payload
            }

        case PERSONNEL_DETAILS_FAIL:
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

export const userPersonnelDetailsReducer = (state = { users: {} }, action) => {
    switch (action.type) {

       case USER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case USER_DETAIL_SUCCESS:
            return {
               
                loading: false,
                users: action.payload
            }

        case USER_DETAIL_FAIL:
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
            return state;
    }
}

export const personnelReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_PERSONNEL_REQUEST:
        case UPDATE_PERSONNEL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_PERSONNEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_PERSONNEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_PERSONNEL_FAIL:
        case UPDATE_PERSONNEL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_PERSONNEL_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_PERSONNEL_RESET:
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


