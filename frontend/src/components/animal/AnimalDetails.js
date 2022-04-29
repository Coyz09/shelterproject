import React, { Fragment,  useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAnimalDetails, newReview, clearErrors } from '../../actions/animalActions'
import { NEW_REVIEW_RESET } from '../../constants/animalConstants'
import ListReviews from '../review/ListReviews'


const AnimalDetails = () => { 
	const dispatch = useDispatch();
    const alert = useAlert();
    let { id } = useParams();


    const { loading, error, animal } = useSelector(state => state.animalDetails);
    const { error: reviewError, success } = useSelector(state => state.newReview)
    const { user } = useSelector(state => state.auth)

    // const [quantity, setQuantity] = useState(1)
    const [setRating] = useState(1)
    const [comment, setComment] = useState('');

    
    useEffect(() => {

        dispatch(getAnimalDetails(id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Comment posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }
    }, [dispatch, alert, error, reviewError, success, id]);


    // const addToCart = () => {
    //     dispatch(addItemToCart(id, quantity));
    //     alert.success('Item Added to Cart')
    // }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })
    function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }
    
    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('comment', comment);
        formData.set('animalId', id);

        dispatch(newReview(formData));
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={animal.name} />
                    <div>
                    <div className="row d-flex justify-content-around">
                        <div className="col-13 col-lg-5 img-fluid" id="product_image">
                             <h1 style={{display: 'flex', justifyContent: 'center'}}>{animal.name}</h1>
                          
                            <hr />
                            <Carousel pause='hover'>
                                {animal.images && animal.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={animal.title} height ="500" width= "550"/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                         </div>
                    <div className="row d-flex justify-content-around">
                        <div className="col-5 col-lg-5 mt-10" >
                        <h2 className="mt-5" id="product_image">DETAILS:</h2>
                        
                            <h3 className="mt-5" id="animal_id">Animal ID # {animal._id}</h3>
                            <hr />   

                             <h4 className="mt-2">Age:</h4>
                            <p id="animal_age">{animal.age}</p>
                            <hr />

                            <h4 className="mt-2">Breed:</h4>
                            <p>{animal.breed}</p>
                            <hr />

                            <h4 className="mt-2">Gender:</h4>
                            <p>{animal.gender}</p>
                            <hr />

                            <h4 className="mt-2">Type:</h4>
                            <p>{animal.type}</p>
                            <hr />

                            

                         </div>

                         <div className="col-12 col-lg-5 mt-5 ">
                            {/*<h3 id="no_of_reviews">({animal.numOfReviews} Comment/s)</h3>
                            <hr />*/}
                             {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                Submit Your Comment
                                </button>
                                :
                                <div className="alert alert-danger mt-5" type='alert'>Login to post your comment.</div>
                                }

                            <div className="row mt-5 mb-5">
                                <div className="col-5 col-lg-5 mt-3 ">
                                 <h3 id="no_of_reviews">({animal.numOfReviews} Comment/s)</h3>
                                     <hr />
                                     </div>
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Type your Comment</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">               
                                                
                                                <textarea
                                                    name="review"
                                                    id="review" className="form-control mt-3"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    >
                                                </textarea>

                                                    
                                                    <button className="btn my-3 float-right review-btn px-4 text-white" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {animal.reviews && animal.reviews.length > 0 && (
                                        <ListReviews reviews={animal.reviews} />
                                        )}

                               
                            </div>
                        </div>

                        </div>
                   </div>
                   
                </Fragment>
            )}
        </Fragment>
    )

}
export default AnimalDetails
