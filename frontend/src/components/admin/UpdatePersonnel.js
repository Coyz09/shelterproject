import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { updatePersonnel, getPersonnelDetails, clearErrors } from '../../actions/personnelActions'
import { UPDATE_PERSONNEL_RESET } from '../../constants/personnelConstants'

const UpdatePersonnel = () => {

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [user, setUser] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
      const categories = [
        "Please Select Category...",
        "Employee",
        "Veterinarian",
        "Volunteer"     
    ]
  
  
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, personnel} = useSelector(state => state.personnelDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.personnel);

    let { id } = useParams();
    let navigate = useNavigate();
   
    useEffect(() => {

        if (personnel && personnel._id !== id) {
            dispatch(getPersonnelDetails(id));
        } else {
            setName(personnel.name);
            setContact(personnel.contact);
            setCategory(personnel.category);
            setEmail(personnel.email);
            setUser(personnel.user);
            // setAvatar(personnel.avatar.url);
            setAvatarPreview(personnel.avatar.url);

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
            navigate('/admin/personnels');
            alert.success('Personnel updated successfully');
            dispatch({ type: UPDATE_PERSONNEL_RESET })
        }

    }, [dispatch, alert, error, isUpdated, navigate, updateError, personnel, id])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('contact', contact);
        formData.set('email', email);
        formData.set('category', category);
        formData.set('user', user); 
        formData.set('avatar', avatar);

        dispatch(updatePersonnel(personnel._id, formData))
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }


    return (
        <Fragment>
            <MetaData title={'Update Personnel'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Personnel</h1>

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
                                  <input
                                        type="hidden"
                                        id="user_field"
                                        className="form-control"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
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
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}
                                    </select>
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
                                        accept='image/*'
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

export default UpdatePersonnel