import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newInjury, clearErrors } from '../../actions/injuryActions'
import { NEW_INJURY_RESET } from '../../constants/injuryConstants'

const NewInjury = () => {

    const [name, setName] = useState('');
   
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const { loading, error, success } = useSelector(state => state.newInjury);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/injuries');
            alert.success('Injury created successfully');
            dispatch({ type: NEW_INJURY_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);

        dispatch(newInjury(formData))
    }

    // const onChange = e => {

    //     const files = Array.from(e.target.files)

    //     setImagesPreview([]);
    //     setImages([])

    //     files.forEach(file => {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setImagesPreview(oldArray => [...oldArray, reader.result])
    //                 setImages(oldArray => [...oldArray, reader.result])
    //             }
    //         }

    //         reader.readAsDataURL(file)
    //     })
    // }


    return (
        <Fragment>
            <MetaData title={'New Injury'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Injury</h1>

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

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
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
export default NewInjury
