import axios from 'axios';

import { 
         

         ADOPTER_DETAILS_REQUEST,
         ADOPTER_DETAILS_SUCCESS,
         ADOPTER_DETAILS_FAIL,

         ADMIN_ADOPTERS_REQUEST,
         ADMIN_ADOPTERS_SUCCESS,
         ADMIN_ADOPTERS_FAIL,

         NEW_ADOPTER_REQUEST,
         NEW_ADOPTER_SUCCESS,
    
         NEW_ADOPTER_FAIL,
         
         NEW_ADOPTERS_REQUEST,
         NEW_ADOPTERS_SUCCESS,
     
         NEW_ADOPTERS_FAIL,

         NEW_ADOPT_REQUEST,
         NEW_ADOPT_SUCCESS,
        
         NEW_ADOPT_FAIL,
         
         NEW_ADOPTS_REQUEST,
         NEW_ADOPTS_SUCCESS,
       
         NEW_ADOPTS_FAIL,

         DELETE_ADOPTER_REQUEST,
         DELETE_ADOPTER_SUCCESS,
         
         DELETE_ADOPTER_FAIL,

         UPDATE_ADOPTER_REQUEST,
         UPDATE_ADOPTER_SUCCESS,
         
         UPDATE_ADOPTER_FAIL,

         CLEAR_ERRORS 
        } from '../constants/adopterConstants'

    
export const getAdopterDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADOPTER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/adopter/${id}`)

        dispatch({
            type: ADOPTER_DETAILS_SUCCESS,
            payload: data.adopter
        })

    } catch (error) {
        dispatch({
            type: ADOPTER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// export const getUserDetails = () => async (dispatch) => {
//     try {

//         dispatch({ type: USER_DETAIL_REQUEST })
      

//         const { data } = await axios.get(`/api/v1/adopter/user/me`)

//         dispatch({
//             type: USER_DETAIL_SUCCESS,
//             payload: data.user
//         })

//     } catch (error) {
//         dispatch({
//             type: USER_DETAIL_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

export const getAdminAdopters = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_ADOPTERS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/adopters`)

        dispatch({
            type: ADMIN_ADOPTERS_SUCCESS,
            payload: data.adopters
        })

    } catch (error) {

        dispatch({
            type: ADMIN_ADOPTERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newAdopter = (adopterData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ADOPTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.post(`/api/v1/admin/adopter/new`, adopterData, config)

        dispatch({
            type: NEW_ADOPTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ADOPTER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newAdopterUser = (adopteruserData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ADOPTERS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.post(`/api/v1/admin/adopter/register`, adopteruserData, config)

        dispatch({
            type: NEW_ADOPTERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ADOPTERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newAdopt = (adopterData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ADOPT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.post(`/api/v1/adopter/new`, adopterData, config)

        dispatch({
            type: NEW_ADOPT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ADOPT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newAdoptUser = (adopteruserData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ADOPTS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        const { data } = await axios.post(`/api/v1/adopter/register`, adopteruserData, config)

        dispatch({
            type: NEW_ADOPTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ADOPTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAdopter = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ADOPTER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/adopter/${id}`)

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

export const updateAdopter = (id, adopterData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ADOPTER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/adopter/${id}`, adopterData, config)

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

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS

    })
}
