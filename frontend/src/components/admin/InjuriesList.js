import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminInjuries, deleteInjury, clearErrors } from '../../actions/injuryActions'
import { DELETE_INJURY_RESET } from '../../constants/injuryConstants'

const InjuriesList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, injuries } = useSelector(state => state.injuries);
    const { error: deleteError, isDeleted } = useSelector(state => state.injury)

    useEffect(() => {
        dispatch(getAdminInjuries());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Injury deleted successfully');
            navigate('/admin/injuries');
            dispatch({ type: DELETE_INJURY_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate])
 
    const setInjuries = () => {
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
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        injuries.forEach(injury => {
            data.rows.push({
                id: injury._id,
                name: injury.name,
                actions: <Fragment>
                    <Link to={`/admin/injury/${injury._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteInjuryHandler(injury._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteInjuryHandler = (id) => {
        dispatch(deleteInjury(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Injuries'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Injuries</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setInjuries()}
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

export default InjuriesList