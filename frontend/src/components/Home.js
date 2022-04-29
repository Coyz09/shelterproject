import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert'

import Pagination from 'react-js-pagination'

// import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { getAnimals } from '../actions/animalActions'
import MetaData from './layout/MetaData'
import Animal from './animal/Animal'
import Loader from './layout/Loader'

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let { keyword } = useParams();

  const {loading, animals, error, animalsCount, resPerPage, filteredAnimalsCount } = useSelector(state => state.animals);
 
  const [currentPage, setCurrentPage] = useState(1);
   // const [age, setAge] = useState([1, 20]);
	const [type, setType] = useState('');
    const [gender, setGender] = useState('');

    const types = [
        'Dog',
        'Cat'
    ]

    const genders = [
        'Male',
        'Female'
    ]

  //    const createSliderWithTooltip = Slider.createSliderWithTooltip;
  // const Range = createSliderWithTooltip(Slider.Range);
  useEffect( () => {
    if(error){
    
      return alert.error(error)
    }
    dispatch(getAnimals( keyword, currentPage, gender, type ))
  }, [dispatch, alert, error, keyword, currentPage, gender, type] )

  let count = animalsCount;

  function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

  if (keyword) {
        count = filteredAnimalsCount
    }

  return (
    <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Animal Shelter'} />

                    <h1 id="animals_heading">Adoptable Animals</h1>

                    <section id="animals" className="container mt-5">
               
                        <div className="row">
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">

                                    <div className="px-5">
                                      
                                          
                                            <hr className="my-5" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                   Gender
                                                </h4>
                                                <ul className="pl-0">
                                                    {genders.map(gender => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={gender}
                                                            onClick={() => setGender(gender)}>
                                                            {gender}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="px-5">
                                      
                                          
                                            <hr className="my-5" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Type
                                                </h4>
                                                <ul className="pl-0">
                                                    {types.map(type => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={type}
                                                            onClick={() => setType(type)}>
                                                            {type}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                     <div className="col-6 col-md-9">
                                     <div className="row">
			                            {animals.map(animal => (
			                             <Animal key={animal._id} animal={animal} col={4} />
			                               ))}
			                        </div>
			                         </div>
                                </Fragment>
                            ) : (
                                    animals.map(animal => (
                                        <Animal key={animal._id} animal={animal} col={3} />
                                    ))
                                )}

                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={animalsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}

                </Fragment>
            )}

        </Fragment>

    );
}

export default Home