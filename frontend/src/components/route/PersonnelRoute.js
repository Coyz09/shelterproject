import React from 'react'
import {  Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader'


const PersonnelRoute = ({ children, isPersonnel=false }) => {
  

  const { isAuthenticated, loading,user } = useSelector(state => state.auth);
  if ( loading === false ) {  
      if (isAuthenticated === false) {
          return <Navigate to='/login'  />
      }

      if (isPersonnel === true && user.role !== 'personnel') {
          return <Navigate to='/'  />
      }

      return children
      }
  return <Loader />;
};
export default PersonnelRoute ;


