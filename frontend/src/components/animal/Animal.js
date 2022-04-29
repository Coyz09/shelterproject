import React from 'react'
import { Link } from 'react-router-dom'

const Animal = ({animal}) => {
	return ( 
		<div className="col-sm-12 col-md-6 col-lg-3 my-3">
	          <div className="card p-3 rounded">
	            <img
	              className="card-img-top mx-auto"
	              src={animal.images[0].url}
	            />
	            <div className="card-body d-flex flex-column">
	              <h5 className="card-title" style={{display: 'flex', justifyContent: 'center'}}>
	               {/*  <a href="">{animal.name}</a>*/}
	               <Link to={`/animal/${animal._id}`} id="" className="btn btn-link btn-lg">{animal.name}</Link>
	              </h5>

 				<h5 className="card-title" style={{display: 'flex', justifyContent: 'center'}}>
	                  <p className="card-text">Breed: {animal.breed}</p>
	              </h5>

	             <h6 className="card-title">
	              <p className="card-text">Age: {animal.age}</p>
   				</h6>

	              <h6 className="card-title">
	                <p className="card-text">Type: {animal.type}</p>
	              </h6>

	              <h6 className="card-title">
	                <p className="card-text">Gender: {animal.gender}</p>
	              </h6>

	              <Link to={`/animal/${animal._id}`} id="view_btn" className="btn btn-block">View Details</Link>
	            </div>
	          </div>
	        </div>
	      )
}
export default Animal