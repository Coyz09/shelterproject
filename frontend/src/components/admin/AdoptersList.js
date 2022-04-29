import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAdopters, deleteAdopter, clearErrors } from '../../actions/adopterActions'
import { DELETE_ADOPTER_RESET } from '../../constants/adopterConstants'

const AdoptersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, adopters } = useSelector(state => state.adopters);
    const { error: deleteError, isDeleted } = useSelector(state => state.adopter)

    useEffect(() => {
        dispatch(getAdminAdopters());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Adopters deleted successfully');
            navigate('/admin/adopters');
            dispatch({ type: DELETE_ADOPTER_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate])
 
    const setAdopters = () => {
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
                   <Link to={`/admin/adopter/${adopter._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
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

    return (
        <Fragment>
            <MetaData title={'All Adopters'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Adopters</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setAdopters()}
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

export default AdoptersList