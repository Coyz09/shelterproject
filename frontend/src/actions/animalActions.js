import axios from 'axios';

import { ALL_ANIMALS_REQUEST,
         ALL_ANIMALS_SUCCESS, 
         ALL_ANIMALS_FAIL,

         ANIMAL_DETAILS_REQUEST,
         ANIMAL_DETAILS_SUCCESS,
         ANIMAL_DETAILS_FAIL,
         
         NEW_REVIEW_REQUEST,
         NEW_REVIEW_SUCCESS,
      
         NEW_REVIEW_FAIL,

         ADMIN_ANIMALS_REQUEST,
         ADMIN_ANIMALS_SUCCESS,
         ADMIN_ANIMALS_FAIL,

         NEW_ANIMAL_REQUEST,
         NEW_ANIMAL_SUCCESS,
       
         NEW_ANIMAL_FAIL,

         DELETE_ANIMAL_REQUEST,
         DELETE_ANIMAL_SUCCESS,
        
         DELETE_ANIMAL_FAIL,

         UPDATE_ANIMAL_REQUEST,
         UPDATE_ANIMAL_SUCCESS,
        
         UPDATE_ANIMAL_FAIL,


        GET_REVIEWS_REQUEST,
        GET_REVIEWS_SUCCESS,
        GET_REVIEWS_FAIL,

        DELETE_REVIEW_REQUEST,
        DELETE_REVIEW_SUCCESS,
       
        DELETE_REVIEW_FAIL,


         CLEAR_ERRORS 
        } from '../constants/animalConstants'

export const deleteReview = (id, animalId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&animalId=${animalId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAnimalReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAnimals = (keyword='', currentPage=1,gender, type) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_ANIMALS_REQUEST
        })
        let link = `/api/v1/animals?keyword=${keyword}&page=${currentPage}`

        if (gender) {
            link = `/api/v1/animals?keyword=${keyword}&page=${currentPage}&gender=${gender}`     
        }

        if (type) {
            link = `/api/v1/animals?keyword=${keyword}&page=${currentPage}&gender=${gender}&type=${type}`
            
        }
        // &age[lte]=${age[1]}&age[gte]=${age[0]}
        
        const {data} = await axios.get(link)
        
        dispatch({
            type: ALL_ANIMALS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAnimalDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ANIMAL_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/animal/${id}`)

        dispatch({
            type: ANIMAL_DETAILS_SUCCESS,
            payload: data.animal
        })

    } catch (error) {
        dispatch({
            type: ANIMAL_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getAdminAnimals = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_ANIMALS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/animals`)

        dispatch({
            type: ADMIN_ANIMALS_SUCCESS,
            payload: data.animals
        })

    } catch (error) {

        dispatch({
            type: ADMIN_ANIMALS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newAnimal = (animalData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ANIMAL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }

        const { data } = await axios.post(`/api/v1/admin/animal/new`, animalData, config)

        dispatch({
            type: NEW_ANIMAL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ANIMAL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAnimal = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ANIMAL_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/animal/${id}`)

        dispatch({
            type: DELETE_ANIMAL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ANIMAL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateAnimal = (id, animalData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ANIMAL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/animal/${id}`, animalData, config)

        dispatch({
            type: UPDATE_ANIMAL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ANIMAL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS

    })
}
