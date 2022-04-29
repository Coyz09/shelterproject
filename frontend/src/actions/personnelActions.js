import axios from 'axios';

import {
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
     
         NEW_PERSONNEL_FAIL,

         NEW_PERSONNELS_REQUEST,
         NEW_PERSONNELS_SUCCESS,
         
         NEW_PERSONNELS_FAIL,

         DELETE_PERSONNEL_REQUEST,
         DELETE_PERSONNEL_SUCCESS,
       
         DELETE_PERSONNEL_FAIL,

         UPDATE_PERSONNEL_REQUEST,
         UPDATE_PERSONNEL_SUCCESS,
        
         UPDATE_PERSONNEL_FAIL,

         USER_DETAIL_REQUEST,
         USER_DETAIL_SUCCESS,
         USER_DETAIL_FAIL,


         DELETE_ADOPTER_REQUEST,
         DELETE_ADOPTER_SUCCESS,
   
         DELETE_ADOPTER_FAIL,

         UPDATE_ADOPTER_REQUEST,
         UPDATE_ADOPTER_SUCCESS,
        
         UPDATE_ADOPTER_FAIL,
 

         CLEAR_ERRORS 
		} from '../constants/personnelConstants';

export const deleteAdopter = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ADOPTER_REQUEST })

        const { data } = await axios.delete(`/api/v1/person/adopter/${id}`)

        dispatch({
            type: DELETE_ADOPTER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ADOPTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateAdopter = (id) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ADOPTER_REQUEST })



        const { data } = await axios.put(`/api/v1/person/adopter/${id}`)

        dispatch({
            type: UPDATE_ADOPTER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ADOPTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatesAdopter = (id) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ADOPTER_REQUEST })



        const { data } = await axios.put(`/api/v1/persons/adopter/${id}`)

        dispatch({
            type: UPDATE_ADOPTER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ADOPTER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getPersonnelAdopters = () => async (dispatch) => {
    try {

        dispatch({ type: PERSONNEL_ADOPTERS_REQUEST })

        const { data } = await axios.get(`/api/v1/person/adopters`)

        dispatch({
            type: PERSONNEL_ADOPTERS_SUCCESS,
            payload: data.adopters
        })

    } catch (error) {

        dispatch({
            type: PERSONNEL_ADOPTERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getPersonnelDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PERSONNEL_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/personnel/${id}`)

        dispatch({
            type: PERSONNEL_DETAILS_SUCCESS,
            payload: data.personnel
        })

    } catch (error) {
        dispatch({
            type: PERSONNEL_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserDetails = () => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAIL_REQUEST })
      

        const { data } = await axios.get(`/api/v1/personnel/user/me`)

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminPersonnels = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PERSONNELS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/personnels`)

        dispatch({
            type: ADMIN_PERSONNELS_SUCCESS,
            payload: data.personnels
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PERSONNELS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newPersonnel = (personnelData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PERSONNEL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.post(`/api/v1/admin/personnel/new`, personnelData, config)

        dispatch({
            type: NEW_PERSONNEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newPersonnelUser = (personneluserData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PERSONNELS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.post(`/api/v1/admin/personnel/register`, personneluserData, config)

        dispatch({
            type: NEW_PERSONNELS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PERSONNELS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deletePersonnel = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PERSONNEL_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/personnel/${id}`)

        dispatch({
            type: DELETE_PERSONNEL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePersonnel = (id, personnelData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PERSONNEL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/personnel/${id}`, personnelData, config)

        dispatch({
            type: UPDATE_PERSONNEL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PERSONNEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS

    })
}
