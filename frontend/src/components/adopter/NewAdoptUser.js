import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newAdoptUser, clearErrors } from '../../actions/adopterActions'
import { NEW_ADOPTS_RESET } from '../../constants/adopterConstants'

const NewAdoptUser = () => {

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
 
  

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const { errors, successs } = useSelector(state => state.newAdoptUser);

    useEffect(() => {

        if (errors) {
            alert.errors(errors);
            dispatch(clearErrors())
        }
   
        if (successs) {
            navigate('/adopter/new');
            alert.success('New Adopter register successfully');
            dispatch({ type: NEW_ADOPTS_RESET })
        }

    }, [dispatch, alert, errors, successs, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);  
        formData.set('avatar', avatar);

        dispatch(newAdoptUser(formData))
       
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        }
    }

    return (
        <Fragment>
            <MetaData title={'Register Adopter'} />
            <div className="row">
                <div className="col-12 col-md-1">
                    
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Register Adopter </h1>

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
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        name='password'
                                        value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                            
                               
                            <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>


                                <button
                                   id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    
                                >
                                    REGISTER
                                </button>

                            </form>
                        </div>


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
export default NewAdoptUser 
