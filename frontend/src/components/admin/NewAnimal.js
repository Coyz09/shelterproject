import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newAnimal, clearErrors } from '../../actions/animalActions'
import { NEW_ANIMAL_RESET } from '../../constants/animalConstants'

const NewAnimal = () => {

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [type, setType] = useState('');
    const [images, setImages] = useState([])
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
    let navigate = useNavigate()

    const {  error, success } = useSelector(state => state.newAnimal);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/animals');
            alert.success('Animal created successfully');
            dispatch({ type: NEW_ANIMAL_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

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

        dispatch(newAnimal(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

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
            <MetaData title={'New Animal'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Animal</h1>

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

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    // disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
export default NewAnimal
