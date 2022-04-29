import React, { Fragment,useState, useEffect   } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'


import {  useSelector } from 'react-redux'



const PersonnelProfile = () => { 
 

    const {loading, user} = useSelector(state => state.auth);

    //  const fetchUser = async () =>
    //  {
    //     const apiCall = await fetch(`http://localhost:4000/api/v1/me/personnel`);
    //     const persons = await apiCall.json();
    //      setID(persons._id);
    //      // setEmail(users.user.email);
    //      // setAvatarPreview(users.user.avatar.url);
    //      // setAvatar(users.user.avatar.url);
    //      console.log(persons);
             
    //  }
    //   useEffect(() => {
    //     fetchUser()
    
    // }, [])

      
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Personnel Profile'} />

                    <h2 className="mt-5 ml-5">Personnel Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>
{/*{`/admin/personnel/${setID(persons.personnel._id)}`}*/}

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>


                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default PersonnelProfile