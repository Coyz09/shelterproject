import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminPersonnels, deletePersonnel, clearErrors } from '../../actions/personnelActions'
import { DELETE_PERSONNEL_RESET } from '../../constants/personnelConstants'

const PersonnelsList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, personnels } = useSelector(state => state.personnels);
    const { error: deleteError, isDeleted } = useSelector(state => state.personnel)

    useEffect(() => {
        dispatch(getAdminPersonnels());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Personnel deleted successfully');
            navigate('/admin/personnels');
            dispatch({ type: DELETE_PERSONNEL_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate])
 
    const setPersonnels = () => {
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
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                 {
                    label: 'Category',
                    field: 'category',
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

        personnels.forEach(personnel => {
            data.rows.push({
                id: personnel._id,
                name: personnel.name,
                contact: personnel.contact,
                email: personnel.email,
                category: personnel.category,

                avatar: <Fragment>
                     <img src={personnel.avatar.url} class="img-fluid img-thumbnail" height ="200" width= "200"/>      
                    </Fragment>,
                actions: <Fragment>
                   <Link to={`/admin/personnel/${personnel._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deletePersonnelHandler(personnel._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deletePersonnelHandler = (id) => {
        dispatch(deletePersonnel(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Personnels'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Personnels</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setPersonnels()}
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

export default PersonnelsList