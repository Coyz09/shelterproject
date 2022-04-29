import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getAdminPersonnels } from '../../actions/personnelActions'
import { getAdminInjuries } from '../../actions/injuryActions'
import { getAdminAnimals } from '../../actions/animalActions'
import { getAdminAdopters } from '../../actions/adopterActions'
import { allUsers } from '../../actions/userActions'

const Dashboard = () => {

    const dispatch = useDispatch();
    const { personnels } = useSelector(state => state.personnels )
    const { injuries } = useSelector(state => state.injuries )
    const { animals } = useSelector(state => state.animals)
    const { adopters } = useSelector(state => state.adopters)
    const { users } = useSelector(state => state.allUsers)
 

 
    useEffect(() => {
        dispatch(getAdminPersonnels())
        dispatch(getAdminInjuries())
        dispatch(getAdminAnimals())
        dispatch(getAdminAdopters())
        dispatch(allUsers())
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {false ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />


                            <div className="row pr-4">
                              

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        
                                       
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
 
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                 <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">

                                        <div className="card-body">
                                            <div className="text-center card-font-size">Animals<br /> <b>{animals && animals.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/animals ">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                 <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">

                                        <div className="card-body">
                                            <div className="text-center card-font-size">Injuries<br /> <b>{injuries && injuries.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/injuries">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                  <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">

                                        <div className="card-body">
                                            <div className="text-center card-font-size">Personnels <br /> <b>{personnels && personnels.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/personnels">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                 <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">

                                        <div className="card-body">
                                            <div className="text-center card-font-size">Adopters <br /> <b>{adopters && adopters.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/adopters">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>



                            </div>
                        </Fragment>
                    )}

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard