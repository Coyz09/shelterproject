import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { updateInjury, getInjuryDetails, clearErrors } from '../../actions/injuryActions'
import { UPDATE_INJURY_RESET } from '../../constants/injuryConstants'

const UpdateInjury = () => {

    const [name, setName] = useState('');
  
  
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, injury} = useSelector(state => state.injuryDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.injury);

    let { id } = useParams();
    let navigate = useNavigate();
   
    useEffect(() => {

        if (injury && injury._id !== id) {
            dispatch(getInjuryDetails(id));
        } else {
            setName(injury.name);
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
            navigate('/admin/injuries');
            alert.success('Injury updated successfully');
            dispatch({ type: UPDATE_INJURY_RESET })
        }

    }, [dispatch, alert, error, isUpdated, navigate, updateError, injury, id])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
    
        dispatch(updateInjury(injury._id, formData))
    }


    return (
        <Fragment>
            <MetaData title={'Update Injury'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Injury</h1>

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

export default UpdateInjury