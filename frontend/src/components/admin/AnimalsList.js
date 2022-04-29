import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAnimals, deleteAnimal, clearErrors } from '../../actions/animalActions'
import { DELETE_ANIMAL_RESET } from '../../constants/animalConstants'

const AnimalsList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, animals } = useSelector(state => state.animals);
    const { error: deleteError, isDeleted } = useSelector(state => state.animal)

    useEffect(() => {
        dispatch(getAdminAnimals());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Animal deleted successfully');
            navigate('/admin/animals');
            dispatch({ type: DELETE_ANIMAL_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate])
 
    

    const setAnimals = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },

                 {
                    label: 'Breed',
                    field: 'breed',
                    sort: 'asc'
                },

                 {
                    label: 'Age',
                    field: 'age',
                    sort: 'asc'
                },


                 {
                    label: 'Gender',
                    field: 'gender',
                    sort: 'asc'
                },
                 {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc'
                },
                 {
                    label: 'Image',
                    field: 'images',
                    sort: 'asc'
                },
               
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

   
        animals.forEach(animal => {
            data.rows.push({
                id: animal._id,
                name: animal.name,
                breed: animal.breed,
                 age: animal.age,
                gender: animal.gender,
                type: animal.type,
                images: <Fragment>
                    <div className="col-12 col-lg-5 img-fluid" id="animal_image">
                 
                        {animal.images && animal.images.map(image => (   
                           <img src={image.url} class="img-fluid img-thumbnail" height ="150" width= "150"/>         
                                ))}
                   
                       </div>
                        
                    </Fragment>,
                actions: <Fragment>
                    <Link to={`/admin/animal/${animal._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteAnimalHandler(animal._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteAnimalHandler = (id) => {
        dispatch(deleteAnimal(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Animals'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Animals</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setAnimals()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default AnimalsList