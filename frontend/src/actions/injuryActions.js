import axios from 'axios';

import {
         INJURY_DETAILS_REQUEST,
         INJURY_DETAILS_SUCCESS,
         INJURY_DETAILS_FAIL,


         ADMIN_INJURIES_REQUEST,
         ADMIN_INJURIES_SUCCESS,
         ADMIN_INJURIES_FAIL,

         NEW_INJURY_REQUEST,
         NEW_INJURY_SUCCESS,
   
         NEW_INJURY_FAIL,

         DELETE_INJURY_REQUEST,
         DELETE_INJURY_SUCCESS,
        
         DELETE_INJURY_FAIL,

         UPDATE_INJURY_REQUEST,
         UPDATE_INJURY_SUCCESS,
         
         UPDATE_INJURY_FAIL,


         CLEAR_ERRORS 
		} from '../constants/injuryConstants';



export const getInjuryDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: INJURY_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/injury/${id}`)

        dispatch({
            type: INJURY_DETAILS_SUCCESS,
            payload: data.injury
        })

    } catch (error) {
        dispatch({
            type: INJURY_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getAdminInjuries = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_INJURIES_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/injuries`)

        dispatch({
            type: ADMIN_INJURIES_SUCCESS,
            payload: data.injuries
        })

    } catch (error) {

        dispatch({
            type: ADMIN_INJURIES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newInjury = (injuryData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_INJURY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }

        const { data } = await axios.post(`/api/v1/admin/injury/new`,  injuryData, config)

        dispatch({
            type: NEW_INJURY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_INJURY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteInjury = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_INJURY_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/injury/${id}`)

        dispatch({
            type: DELETE_INJURY_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_INJURY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateInjury = (id, injuryData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_INJURY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/injury/${id}`, injuryData, config)

        dispatch({
            type: UPDATE_INJURY_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_INJURY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS

    })
}
