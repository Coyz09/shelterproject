import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getPersonnelAdopters, deleteAdopter, updateAdopter ,updatesAdopter, clearErrors } from '../../actions/personnelActions'
import { DELETE_ADOPTER_RESET, UPDATE_ADOPTER_RESET } from '../../constants/personnelConstants'


const PersonnelAdoptersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, adopters } = useSelector(state => state.adopters);
    const { error: deleteError,updateError, isDeleted, isUpdated } = useSelector(state => state.adopter)

    useEffect(() => {
        dispatch(getPersonnelAdopters());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

         if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Adopters deleted successfully');
            navigate('/person/adopters');
            dispatch({ type: DELETE_ADOPTER_RESET })
        }

          if (isUpdated) {
            navigate('/person/adopters');
            alert.success('Adopter updated successfully');
            dispatch({ type: UPDATE_ADOPTER_RESET })
        }

    }, [dispatch, alert, error, deleteError, updateError, isDeleted, isUpdated, navigate])
 
    const setPersonnelAdopters = () => {
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
                    label: 'Contact',
                    field: 'contact',
                    sort: 'asc'
                },
                 {
                    label: 'Address',
                    field: 'address',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                 {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Avatar',
                    field: 'avatar',
                    sort: 'asc'
                },

               
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        adopters.forEach(adopter => {
            data.rows.push({
                id: adopter._id,
                name: adopter.name,
                contact: adopter.contact,
                address: adopter.address,
                email: adopter.email,
                status: adopter.status,

                avatar: <Fragment>
                     <img src={adopter.avatar.url} class="img-fluid img-thumbnail" height ="200" width= "200"/>      
                    </Fragment>,
                actions: <Fragment>
                 {/*<Link to={`/admin/adopter/${adopter._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>*/}
                    <button className="btn btn-success py-1 px-2 ml-2" onClick={() => updateAdopterHandler(adopter._id)}>
                        <i className="fa fa-check"></i>
                    </button>

                     <button className="btn btn-warning py-1 px-2 ml-2" onClick={() => inactiveAdopterHandler(adopter._id)}>
                        <i className="fa fa-ban"></i>
                    </button>

                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteAdopterHandler(adopter._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteAdopterHandler = (id) => {
        dispatch(deleteAdopter(id))
    }

    const updateAdopterHandler = (id) => {
        dispatch(updateAdopter(id))
    }

     const inactiveAdopterHandler = (id) => {
        dispatch(updatesAdopter(id))
    }


    return (
        <Fragment>
            <MetaData title={'All Adopters'} />
            <div className="row">
                <div className="col-12 col-md-1">
                 
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Adopters</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setPersonnelAdopters()}
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

export default PersonnelAdoptersList