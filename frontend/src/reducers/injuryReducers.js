import { ALL_INJURIES_REQUEST,
		 ALL_INJURIES_SUCCESS, 
		 ALL_INJURIES_FAIL,
		 INJURY_DETAILS_REQUEST,
		 INJURY_DETAILS_SUCCESS,
	     INJURY_DETAILS_FAIL,


         ADMIN_INJURIES_REQUEST,
         ADMIN_INJURIES_SUCCESS,
         ADMIN_INJURIES_FAIL,

         NEW_INJURY_REQUEST,
         NEW_INJURY_SUCCESS,
         NEW_INJURY_RESET,
         NEW_INJURY_FAIL,

         DELETE_INJURY_REQUEST,
         DELETE_INJURY_SUCCESS,
         DELETE_INJURY_RESET,
         DELETE_INJURY_FAIL,

         UPDATE_INJURY_REQUEST,
         UPDATE_INJURY_SUCCESS,
         UPDATE_INJURY_RESET,
         UPDATE_INJURY_FAIL,


		 CLEAR_ERRORS 
		} from '../constants/injuryConstants'

 
export const newInjuryReducer = (state = { injury: {} }, action) => {
    switch (action.type) {

        case NEW_INJURY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_INJURY_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                injury: action.payload.injury
            }

        case NEW_INJURY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_INJURY_RESET:
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

export const injuriesReducer = (state = { injuries: [] }, action) => {
	switch(action.type) {
		case ALL_INJURIES_REQUEST:
        case ADMIN_INJURIES_REQUEST:
			return {
				loading: true,
				injuries: []
			}
		case ALL_INJURIES_SUCCESS:
			return {
				loading:false,
				injuries: action.payload.injuries,
				injuriesCount: action.payload.injuriesCount,
				resPerPage: action.payload.resPerPage,
				filteredInjuriesCount: action.payload.filteredInjuriesCount
			}
		case ALL_INJURIES_FAIL:
        case ADMIN_INJURIES_FAIL:
			return {
				loading:false,
				error: action.payload
			}

        case ADMIN_INJURIES_SUCCESS:
            return {
                loading: false,
                injuries: action.payload
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

export const injuryDetailsReducer = (state = { injury: {} }, action) => {
    switch (action.type) {

        case INJURY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case INJURY_DETAILS_SUCCESS:
            return {
                loading: false,
                injury: action.payload
            }

        case INJURY_DETAILS_FAIL:
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


export const injuryReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_INJURY_REQUEST:
        case UPDATE_INJURY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_INJURY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_INJURY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_INJURY_FAIL:
        case UPDATE_INJURY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_INJURY_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_INJURY_RESET:
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


