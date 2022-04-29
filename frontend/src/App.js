import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadUser } from './actions/userActions'
import { useSelector} from 'react-redux'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'

import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'



import Dashboard from './components/admin/Dashboard'
import AnimalReviews from './components/admin/AnimalReviews'

import PersonnelsList from './components/admin/PersonnelsList'
import NewPersonnel from './components/admin/NewPersonnel'
import NewPersonnelUser from './components/admin/NewPersonnelUser'
import UpdatePersonnel from './components/admin/UpdatePersonnel'
import PersonnelProfile from './components/personnel/PersonnelProfile'
import PersonnelAdoptersList from './components/personnel/PersonnelAdoptersList'

import InjuriesList from './components/admin/InjuriesList'
import NewInjury from './components/admin/NewInjury'
import UpdateInjury from './components/admin/UpdateInjury'

import AnimalsList from './components/admin/AnimalsList'
import NewAnimal from './components/admin/NewAnimal'
import UpdateAnimal from './components/admin/UpdateAnimal'
import AnimalDetails from './components/animal/AnimalDetails'

import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import AdminProfile from './components/admin/AdminProfile'
import UpdateAdminProfile from './components/admin/UpdateAdminProfile'

import AdoptersList from './components/admin/AdoptersList'
import NewAdopter from './components/admin/NewAdopter'
import NewAdopterUser from './components/admin/NewAdopterUser'
import NewAdopt from './components/adopter/NewAdopt'
import NewAdoptUser from './components/adopter/NewAdoptUser'
import AdopterProfile from './components/adopter/AdopterProfile'
import UpdateAdopter from './components/admin/UpdateAdopter'

import ProtectedRoute from './components/route/ProtectedRoute'
import PersonnelRoute from './components/route/PersonnelRoute'
import store from './store'


function App() {
  

  useEffect(() => {
      store.dispatch(loadUser());
  }, [])

const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
   <Router>
      <div className="App">
      <Header />
      <Routes>
  
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/search/:keyword" element={<Home />} exact="true"/>
        <Route path="/animal/:id" element={<AnimalDetails />} exact="true" />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
        <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
        <Route path="/me/update" element={<UpdateProfile />}  />
        <Route path="/password/update" element={<UpdatePassword />}  />

        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

         <Route
          path="/me/personnel"
          element={
            <PersonnelRoute isPersonnel={true}>
              <PersonnelProfile />
            </PersonnelRoute>
          
             
          }
        />
        <Route
          path="/me/adopter"
          element={
         
              <AdopterProfile />
           
          
             
          }
        />


        <Route
          path="/admin/me"
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <AnimalReviews />
            </ProtectedRoute>
          }
        />

         <Route
         path="/admin/animals"
          element={
            <ProtectedRoute isAdmin={true}>
              <AnimalsList />
            </ProtectedRoute>
          }
        />
        
        <Route path="/admin/animal/new" 
            element={ 
            <ProtectedRoute isAdmin={true}>
                <NewAnimal  />
            </ProtectedRoute>
          }  
        />

         <Route path="/admin/animal/:id"
            element={ 
            <ProtectedRoute isAdmin={true}>
                <UpdateAnimal />
            </ProtectedRoute>
          }  
        />

        <Route
         path="/admin/personnels"
          element={
            <ProtectedRoute isAdmin={true}>
              <PersonnelsList />
            </ProtectedRoute>
          }
        />
        
         <Route
         path="/admin/personnel/register"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewPersonnelUser />
            </ProtectedRoute>
          }
        />


        <Route
         path="/admin/personnel/new"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewPersonnel />
            </ProtectedRoute>
          }
        />


        <Route
         path="/admin/personnel/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdatePersonnel/>
            </ProtectedRoute>
          }
        />

         <Route
         path="/person/adopters"
          element={
           
              <PersonnelAdoptersList />
         
          }
        />


        <Route
         path="/admin/adopters"
          element={
            <ProtectedRoute isAdmin={true}>
              <AdoptersList />
            </ProtectedRoute>
          }
        />
        
         <Route
         path="/admin/adopter/register"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewAdopterUser />
            </ProtectedRoute>
          }
        />


        <Route
         path="/admin/adopter/new"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewAdopter />
            </ProtectedRoute>
          }
        />

          <Route
         path="/adopter/register"
          element={
              <NewAdoptUser />
          }
        />


        <Route
         path="/adopter/new"
          element={
              <NewAdopt />
          }
        />



     <Route
         path="/admin/adopter/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateAdopter/>
            </ProtectedRoute>
          }
        />


        <Route
         path="/admin/injuries"
          element={
            <ProtectedRoute isAdmin={true}>
              <InjuriesList />
            </ProtectedRoute>
          }
        />
        
        <Route path="/admin/injury" 
            element={ 
            <ProtectedRoute isAdmin={true}>
                <NewInjury  />
            </ProtectedRoute>
          }  
        />

         <Route path="/admin/injury/:id"
            element={ 
            <ProtectedRoute isAdmin={true}>
                <UpdateInjury />
            </ProtectedRoute>
          }  
        />

        <Route path="/admin/users"
            element={ 
            <ProtectedRoute isAdmin={true}>
                <UsersList  />
            </ProtectedRoute>
          }  
        />

        <Route path="/admin/user/:id"
            element={ 
            <ProtectedRoute isAdmin={true}>
                <UpdateUser />
            </ProtectedRoute>
          }  
        />

         <Route
         path="admin/me/update"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateAdminProfile />
            </ProtectedRoute>
          }
        />


        
    
     

      </Routes>
       {!loading && (!isAuthenticated || user.role !== 'admin') && ( <Footer /> )}
      
      </div>
    </Router>
  );
}
export default App;
