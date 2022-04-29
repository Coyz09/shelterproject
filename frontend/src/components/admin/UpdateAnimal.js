import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { updateAnimal, getAnimalDetails, clearErrors } from '../../actions/animalActions'
import { UPDATE_ANIMAL_RESET } from '../../constants/animalConstants'

const UpdateAnimal = () => {

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [type, setType] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

       const genders = [
      "Please Select Gender...",
        'Male',
        'Female',
    ]
    const types = [
      "Please Select Type of Animal...",
        'Dog',
        'Cat'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, animal } = useSelector(state => state.animalDetails)
    const {  error: updateError, isUpdated } = useSelector(state => state.animal);

    let { id } = useParams();
    let navigate = useNavigate();
   
    useEffect(() => {

        if (animal && animal._id !== id) {
            dispatch(getAnimalDetails(id));
        } else {
            setName(animal.name);
            setBreed(animal.breed);
            setAge(animal.age);
            setGender(animal.gender);
            setType(animal.type);
            setOldImages(animal.images)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            navigate('/admin/animals');
            alert.success('Animal updated successfully');
            dispatch({ type: UPDATE_ANIMAL_RESET })
        }

    }, [dispatch, alert, error, isUpdated, navigate, updateError, animal, id])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('breed', breed);
        formData.set('age', age);
        formData.set('gender', gender);
        formData.set('type', type);
       

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateAnimal(animal._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            <MetaData title={'Update Animal'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Animal</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                               
                                <div className="form-group">
                                    <label htmlFor="breed_field">Breed</label>
                                    <input
                                        type="text"
                                        id="breed_field"
                                        className="form-control"
                                        value={breed}
                                        onChange={(e) => setBreed(e.target.value)}
                                    />
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="age_field">Age</label>
                                    <input
                                        type="number"
                                        id="age_field"
                                        className="form-control"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>

                            
                                
                                <div className="form-group">
                                    <label htmlFor="gender_field">Gender</label>
                                    <select className="form-control" id="gender_field" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        {genders.map(gender => (
                                            <option key={gender} value={gender} >{gender}</option>
                                        ))}

                                    </select>
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="type_field">Type</label>
                                    <select className="form-control" id="type_field" value={type} onChange={(e) => setType(e.target.value)}>
                                        {types.map(type => (
                                            <option key={type} value={type} >{type}</option>
                                        ))}

                                    </select>
                                </div>  

                              
                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='animal_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                 </label>
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                            </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateAnimal