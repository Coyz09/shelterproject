import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import MetaData from '../layout/MetaData'


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newAdopt, clearErrors } from '../../actions/adopterActions'
import { NEW_ADOPT_RESET } from '../../constants/adopterConstants'

const NewAdopt = () => {

    const [name,setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email,setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()
 
    const {  error, success } = useSelector(state => state.newAdopt);

     const fetchUser = async () =>
     {
        const apiCall = await fetch(`http://localhost:4000/api/v1/adopter/user/me`);
        const users = await apiCall.json();
         setName(users.user.name);
         setEmail(users.user.email);
         setAvatarPreview(users.user.avatar.url);
         setAvatar(users.user.avatar.url);
             
     }
      useEffect(() => {
        fetchUser()

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            navigate('/login');
            alert.success('Register successfully');
            dispatch({ type: NEW_ADOPT_RESET })
        }

    }, [dispatch, alert, error, navigate, success])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('contact', contact);
        formData.set('address', address);
        formData.set('email', email);
        formData.set('avatar', avatar);

        dispatch(newAdopt(formData))
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
            <MetaData title={'New Adopter'} />
            <div className="row">
                <div className="col-12 col-md-1">
                    
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Adopter</h1>

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
                                    <label htmlFor="contact_field">Contact</label>
                                    <input
                                        type="text"
                                        id="contact_field"
                                        className="form-control"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address_field">Address</label>
                                    <input
                                        type="text"
                                        id="address_field"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
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
export default NewAdopt
