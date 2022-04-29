import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newPersonnel, clearErrors } from '../../actions/personnelActions'
import { NEW_PERSONNEL_RESET} from '../../constants/personnelConstants'

const NewPersonnel = () => {

    const [name,setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
    const categories = [
        "Please Select Category...",
        "Employee",
        "Veterinarian",
        "Volunteer"     
    ]

  

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()
 
    const {  error, success } = useSelector(state => state.newPersonnel);
    
     // const { users} = useSelector(state => state.userPersonnelDetails)
     const fetchUser = async () =>
     {
        const apiCall = await fetch(`https://shelterproject.herokuapp.com/api/v1/personnel/user/me`);
        const users = await apiCall.json();
         setName(users.user.name);
         setEmail(users.user.email);
         setAvatarPreview(users.user.avatar.url);
         setAvatar(users.user.avatar.url);
             
     }
      useEffect(() => {
        fetchUser()
        // console.log(fetchUser())
     //    dispatch(getUserDetails())
     // if (users && users.name == users.name ) {
        
     //       setName(users.name);
     //       setEmail(users.email);
           
     //        // setAvatarPreview(user.avatar.url)
     //    }
          
     //    // } else{
     //    //     setName(use.name);
     //    //     setEmail(use.email);
     //    // }   
     //    //  dispatch({
     //    //     type: USER_DETAIL_SUCCESS,
         
     //    // })
            
     //        // setAvatarPreview(user.avatar.url)
          if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }


        if (success) {
            navigate('/admin/personnels');
            alert.success('Personnel created successfully');
            dispatch({ type: NEW_PERSONNEL_RESET })
        }

             // dispatch(getUserDetails())
              // console.log(users)
    }, [dispatch, alert, error, navigate, success])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('contact', contact);
        formData.set('email', email);
        formData.set('category', category);
        formData.set('avatar', avatar);

        dispatch(newPersonnel(formData))
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
            <MetaData title={'New Personnel'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Personnel</h1>

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
export default NewPersonnel
