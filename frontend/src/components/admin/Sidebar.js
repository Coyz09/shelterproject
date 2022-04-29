import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#animalSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-paw"></i> Animals</a>
                        <ul className="collapse list-unstyled" id="animalSubmenu">
                            <li>
                                <Link to="/admin/animals"><i className="fa fa-clipboard"></i> All Animals</Link>
                            </li>

                            <li>
                                <Link to="/admin/animal/new"><i className="fa fa-plus"></i> Create Animal</Link>
                            </li>
                        </ul>
                    </li>

                     <li>
                        <a href="#personnelSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-user"></i> Personnels</a>
                        <ul className="collapse list-unstyled" id="personnelSubmenu">
                            <li>
                                <Link to="/admin/personnels"><i className="fa fa-clipboard"></i> All Personnels</Link>
                            </li>

                            <li>
                                <Link to="/admin/personnel/register"><i className="fa fa-plus"></i> Create Personnel</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#adopterSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-user"></i> Adopters</a>
                        <ul className="collapse list-unstyled" id="adopterSubmenu">
                           { <li>
                                <Link to="/admin/adopters"><i className="fa fa-clipboard"></i> All Adopters</Link>
                            </li>}

                            <li>
                                <Link to="/admin/adopter/register"><i className="fa fa-plus"></i> Create Adopter</Link>
                            </li>
                        </ul>
                    </li>


                    <li>
                        <a href="#injurySubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-medkit"></i> Injuries</a>
                        <ul className="collapse list-unstyled" id="injurySubmenu">
                            <li>
                                <Link to="/admin/injuries"><i className="fa fa-clipboard"></i> All Injuries</Link>
                            </li>

                            <li>
                                <Link to="/admin/injury"><i className="fa fa-plus"></i> Create Injury</Link>
                            </li>
                        </ul>
                    </li>

                 <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar